const sanitizeHtml = require("sanitize-html");
const UserModel = require("../models/user.model");
const Conversation = require("../models/conversation.model");
const { default: mongoose, isValidObjectId } = require("mongoose");
const { onConversationCreate } = require("../utils/socket");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
module.exports.createConversation = async (req, res) => {
    const self = req.self;
    const { name, users } = req.body;

    // Si certains champs sont vides
    if (!users || users?.length === 0) return res.status(400).json({ success: false, message: "Vous ne pouvez pas créer une conversation vide" });

    for (const id of users) {
        if (!isValidObjectId(id)) return res.status(400).json({ success: false, message: `${id} n'est pas un ID valide` });
    }

    // Récupérer les users
    const fetchUsers = await UserModel.find({ '_id': { $in: users } });

    if (users?.length !== fetchUsers?.length) return res.status(400).json({ success: false, message: "Certains utilisateurs spécifié n'existe pas" });

    // Si il n'y a pas de nom le nom sera celui des participants
    const conversation = await (await Conversation.create({ name: (sanitizeHtml(name) || null), users: [...users, self._id.toString()] })).populate("users", "-email");

    console.log("Conversation créer");

    onConversationCreate(conversation);
    return res.status(201).json({ success: true, messages: "Conversation créer avec succès", conversation });
}

/**
 * Récupérer les conversations
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
module.exports.readAllConversations = async (req, res) => {
    const self = req.self;

    // Récupérer les conversations
    const conversations = await Conversation.find({ users: self._id }).populate("users", "-email");
    return res.status(200).json({ success: true, messages: "Conversations récupérer avec succès", conversations });
}

/**
 * Récupérer la conversation
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
module.exports.readConversation = async (req, res) => {
    const conversation = req.conversation;
    return res.status(200).json({ success: true, messages: "Conversation récupérer avec succès", conversation });
}

/**
 * Quitter une conversation
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
module.exports.leaveConversation = async (req, res) => {
    const self = req.self;
    const { conversationId } = req.params;

    // Si certains champs sont vides
    if (!conversationId) return res.status(400).json({ success: false, message: "Merci de spécifié l'ID de la conversation" });

    if (!isValidObjectId(conversationId)) return res.status(400).json({ success: false, message: `${conversationId} n'est pas un ID valide` });

    // Récupérer les users
    const conversation = await Conversation.findOne({ _id: conversationId, users: self._id.toString() }).populate("users", "-email");

    if (!conversation) return res.status(400).json({ success: false, message: "Cette conversation n'existe pas ou alors l'utilisateur n'a pas accès a cette discussion" });

    // Retirer l'utilisateur
    conversation.users = conversation.users.filter(user => user._id.toString() !== self._id.toString());
    conversation.save();

    // Si il reste 0 ou 1 personne supprimer la conv
    if (conversation.users.length >= 1) {
        conversation.deleteOne();
        return res.status(200).json({ success: true, deleted: true, messages: "Conversation quitter avec succès, la conversation a été supprimé", conversation });
    }

    onConversationLeave(conversation, self);
    return res.status(200).json({ success: true, deleted: false, messages: "Conversation quitter avec succès", conversation });
}