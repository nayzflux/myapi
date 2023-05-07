const { login, logout, register } = require('../controllers/auth.controller');

const Router = require('express').Router();

// Créer un compte
Router.post('/register', register);

// Se connecter à un compte
Router.post('/login', login);

// Se deonnecter
Router.post('/logout', logout);

module.exports = Router;