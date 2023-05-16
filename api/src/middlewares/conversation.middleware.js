const { isValidObjectId } = require("mongoose");
const Conversation = require("../models/conversation.model");

/**
 * Obtenir une conversation à partir 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
module.exports.resolveConversation = async (req, res, next) => {
    const { conversationId } = req.params;

    // Si aucun ID n'est précisé
    if (!conversationId) return res.status(400).json({ success: false, message: "Merci de spécifié l'ID de la conversation" });

    // Si l'ID est invalide
    if (!isValidObjectId(conversationId)) return res.status(400).json({ success: false, message: `${conversationId} n'est pas un ID valide` });

    // Récupérer la conversation si elle existe
    const conversation = await Conversation.findOne({ _id: conversationId }).populate("users").exec();

    // Si elle n'existe pas
    if (!conversation) return res.status(404).json({ success: false, message: "Cette conversation est introuvable" });

    req.conversation = conversation;
    return next();
}

/**
 * Vérifier si l'utilisateur participe à la conversation
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
module.exports.isInConversation = async (req, res, next) => {
    const self = req.self;
    const conversation = req.conversation;

    // Si l'utilisateur participe à la conversation
    if (!conversation.users.find(user => user._id.toString() === self._id.toString())) return res.status(403).json({ success: false, message: "Vous n'avez pas accès à cette conversation" });

    return next();
}