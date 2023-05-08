const { getAll, sendMessage } = require('../../../controllers/message.controller');

const Router = require('express').Router();

// Créer
Router.post('/', sendMessage);

// Récupérer
// Router.get('/', getAll);

module.exports = Router;