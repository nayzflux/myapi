
const { typing } = require('../../../controllers/typing.controller');
const { isAuth } = require('../../../middlewares/auth.middleware');

const Router = require('express').Router();

// Créer
Router.post('/', isAuth, typing);

module.exports = Router;