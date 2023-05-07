const { onTyping } = require("../utils/socket");

module.exports.typing = async (req, res) => {
    const self = req.self;
    onTyping(self);
    res.status(200).json({success: true, message: "Vous avez commencé à taper un messages"});
}