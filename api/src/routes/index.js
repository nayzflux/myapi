const Router = require('express').Router();

// Mes routes
const auth = require('./auth.routes');
const user = require('./user.routes');
const typing = require('./typing.routes');
const conversation = require('./conversation.routes');

// Authentication
Router.use('/auth', auth);

// Utilisateurs
Router.use('/users', user);

// Typing
Router.use('/typing', typing);

// Typing
Router.use('/conversations', conversation);

module.exports = Router;