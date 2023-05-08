const Router = require('express').Router();

// Mes routes
const auth = require('./auth/auth.routes');
const user = require('./users/user.routes');
const conversation = require('./conversations/conversation.routes');

// Authentication
Router.use('/auth', auth);

// Utilisateurs
Router.use('/users', user);

// Conversations
Router.use('/conversations', conversation);

module.exports = Router;