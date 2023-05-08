const mongoose = require("mongoose");

// à modifier rajouter des vérifs
const messageSchema = new mongoose.Schema(
    {
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation"
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        content: String,
        created_at: Date,
        edited_at: Date
    }
);

// Avant de sauvegarder le message
messageSchema.pre('save', function (next) {
    const message = this;

    // Si c'est un nouveau document
    if (!message.created_at) {
        // Modifier la date de creation
        message.created_at = Date.now();
    } else {
        // Modifier la date de modification
        message.edited_at = Date.now();
    }

    return next();
});

const MessageModel = mongoose.model("Message", messageSchema, "messages");

module.exports = MessageModel;