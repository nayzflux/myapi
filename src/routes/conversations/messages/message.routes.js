const { getAll, sendMessage, readAllMessages } = require('../../../controllers/message.controller');

const Router = require('express').Router();

// Créer
Router.post('/', sendMessage);

// Récupérer
Router.get('/', readAllMessages);

module.exports = Router;