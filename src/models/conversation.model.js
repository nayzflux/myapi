const mongoose = require("mongoose");

// à modifier rajouter des vérifs
const conversationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        created_at: Date,
        edited_at: Date
    }
);

// Avant de sauvegarder la conv
conversationSchema.pre('save', function (next) {
    const conversation = this;

    // Si c'est un nouveau document
    if (!conversation.created_at) {
        // Modifier la date de creation
        conversation.created_at = Date.now();
    } else {
        // Modifier la date de modification
        conversation.edited_at = Date.now();
    }
    return next();
});

const Conversation = mongoose.model("Conversation", conversationSchema, "conversatons");

module.exports = Conversation;