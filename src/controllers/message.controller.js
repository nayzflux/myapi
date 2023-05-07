const MessageModel = require("../models/message.model");
const { clean } = require("../utils/moderation");
const { onMessageCreate } = require("../utils/socket");
const sanitizeHtml = require("sanitize-html");

module.exports.create = async (req, res) => {
    const self = req.self;
    const { content } = req.body;

    // Si il n'y a pas de contenu
    if (!content) return res.status(400).json({ success: false, message: "Vous ne pouvez pas envoyer un message vides" });

    // Analyser le contenu du message
    // const score = await analyze(content);
    // console.log(score);
    // const score2 = hasBadwords(content);
    // const score3 = isProfane(content);
    // if (score > 0.7 || (score > 0.3 && (score2 || score3))) return res.status(400).json({ success: false, message: "Merci de ne pas publier des messages contenant des propos innaproprié" });

    const message = await (await MessageModel.create({ author: self._id, content: sanitizeHtml(clean(content)) })).populate("author", "username role");
    onMessageCreate(message)
    return res.status(201).json({ success: true, message: "Message créer avec succès", message });
}

module.exports.getAll = async (req, res) => {
    const { limit } = req.query;

    const messages = await MessageModel.find({}, {}, { sort: { created_at: -1 }, limit: (parseInt(limit) || 25) }).populate('author', 'username role').exec();
    return res.status(200).json({ success: true, messages: "Message récupérer avec succès", messages });
}