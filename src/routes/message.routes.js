const { create } = require('../controllers/message.controller');
const { isAuth } = require('../middlewares/auth.middleware');

const Router = require('express').Router();

// Créer
Router.post('/', isAuth, create);

module.exports = Router;