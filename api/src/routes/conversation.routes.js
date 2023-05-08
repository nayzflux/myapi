const { createConversation, leaveConversation } = require('../controllers/conversation.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const message = require('./message.routes');

const Router = require('express').Router();

// Créer
Router.post('/', isAuth, createConversation);

// Quitter / Supprimer
Router.delete('/:conversationId', isAuth, leaveConversation);

// Messages
Router.use('/:conversationId/messages', message);

module.exports = Router;