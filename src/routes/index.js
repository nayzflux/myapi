const Router = require('express').Router();

// Mes routes
const auth = require('./auth.routes');

// Authentication
Router.use('/auth', auth);

module.exports = Router;