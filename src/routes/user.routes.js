const { get, getAll, remove } = require('../controllers/user.controller');
const { canGetUser, canGetAllUsers, canDeleteUser } = require('../middlewares/permission.middleware');
const { handleUser } = require('../middlewares/user.middleware');
const { isAuth } = require('../middlewares/auth.middleware');

const Router = require('express').Router();

// // Récuperer
Router.get('/:query', isAuth, canGetUser, handleUser, get);

// // Récuperer tous
// Router.get('/', canGetAllUsers, getAll);

// // Modifier un utilisateur
// Router.patch('/:query', null);

// // Supprimer
// Router.delete('/:query', canDeleteUser, handleUser, remove);

module.exports = Router;