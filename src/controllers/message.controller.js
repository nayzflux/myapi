const MessageModel = require("../models/message.model");
const { onMessageCreate } = require("../utils/socket");

module.exports.create = async (req, res) => {
    const self = req.self;
    const { content } = req.body;

    // Si il n'y a pas de contenu
    if (!content) return res.status(400).json({ success: false, message: "Vous ne pouvez pas envoyer un message vides" });

    const message = await (await MessageModel.create({ author: self._id, content })).populate("author", "username role");
    console.log(message);
    onMessageCreate(message)
    return res.status(201).json({ success: true, message: "Message créer avec succès", message });
}