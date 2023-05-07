const { create, getAll } = require('../controllers/message.controller');
const { isAuth } = require('../middlewares/auth.middleware');

const Router = require('express').Router();

// Créer
Router.post('/', isAuth, create);

// Récupérer
Router.get('/', isAuth, getAll);

module.exports = Router;