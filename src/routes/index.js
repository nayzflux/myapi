const Router = require('express').Router();

// Mes routes
const auth = require('./auth.routes');

// Authentication
Router.use('/auth', auth);

// Authentication
Router.use('/users', auth);

module.exports = Router;