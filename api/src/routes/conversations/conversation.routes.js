const { createConversation, leaveConversation, readAllConversations, readConversation } = require('../../controllers/conversation.controller');
const { isAuth } = require('../../middlewares/auth.middleware');
const { resolveConversation, isInConversation } = require('../../middlewares/conversation.middleware');

const Router = require('express').Router();

// Créer
Router.post('/', isAuth, createConversation);

// Récupérer
Router.get('/', isAuth, readAllConversations);
Router.get('/:conversationId', isAuth, resolveConversation, isInConversation, readConversation);

// Quitter / Supprimer
Router.delete('/:conversationId', isAuth, resolveConversation, isInConversation, leaveConversation);

// ================= Messages =================
const message = require('./messages/message.routes');
Router.use('/:conversationId/messages', isAuth, resolveConversation, isInConversation, message);

// ================= Typing =================
const typing = require('./typing/typing.routes');
Router.use('/:conversationId/typing', isAuth, resolveConversation, isInConversation, typing);

module.exports = Router;