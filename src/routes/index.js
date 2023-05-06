const Router = require('express').Router();

// Mes routes
const auth = require('./auth.routes');
const user = require('./user.routes');
const message = require('./message.routes');

// Authentication
Router.use('/auth', auth);

// Utilisateurs
// Router.use('/users', user);

// Messages
Router.use('/messages', message);

module.exports = Router;