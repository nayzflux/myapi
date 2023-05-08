const MessageModel = require("../models/message.model");
const { clean } = require("../utils/moderation");
const { onMessageSend } = require("../utils/socket");
const sanitizeHtml = require("sanitize-html");

// module.exports.getAll = async (req, res) => {
//     const { limit } = req.query;

//     const messages = await MessageModel.find({}, {}, { sort: { created_at: 1 }, limit: (parseInt(limit) || 25) }).populate('author', 'username role picture').exec();
//     return res.status(200).json({ success: true, messages: "Message récupérer avec succès", messages });
// }

/**
 * Récupérer les messages d'un conversation
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
module.exports.readAllMessages = async (req, res) => {
    const conversation = req.conversation;
    const { limit } = req.query;

    // Récupérer les messages de la conversation triée et limité
    const messages = await MessageModel.find({ conversation: conversation._id }, {}, { sort: { created_at: 1 }, limit: (parseInt(limit) || 25) }).populate('author conversation', '-password').exec();
    return res.status(200).json({ success: true, message: "Message récupérer avec succès", messages });
}

/**
 * Envoyer un message dans une conversation
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
module.exports.sendMessage = async (req, res) => {
    const self = req.self;
    const conversation = req.conversation;
    const { content } = req.body;

    // Si il n'y a pas de contenu
    if (!content) return res.status(400).json({ success: false, message: "Vous ne pouvez pas envoyer un message vides" });

    // Filtrer le message
    const filteredContent = sanitizeHtml(clean(content));

    // Créer le message dans la DB
    const message = await (await MessageModel.create({ conversation: conversation._id, author: self._id, content: filteredContent })).populate("author conversation", "-email");

    // Envoyer via websocket
    onMessageSend(conversation, message);

    // Envoyer la réponse
    console.log(`Message envoyer dans la conversation ${conversation.name || conversation._id} par ${self.username}`);
    return res.status(201).json({ success: true, info: `Message envoyer dans la conversation ${conversation.name || conversation._id}`, message });
}
