const { onTyping } = require("../utils/socket");

/**
 * Lorsqu'un utilisateur commence à taper dans une conversation
 * @param {Request} req 
 * @param {Response} res 
 */
module.exports.typing = async (req, res) => {
    const self = req.self;
    const conversation = req.conversation;

    // Envoyer l'event dans le WebSocket
    onTyping(self, conversation);
    res.status(200).json({ success: true, message: `Vous avez commencé à taper un messages dans ${conversation.name}` });
}