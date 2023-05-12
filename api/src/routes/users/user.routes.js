const { get, getAll, remove, addFriends } = require('../../controllers/user.controller');
const { canGetUser, canGetAllUsers, canDeleteUser } = require('../../middlewares/permission.middleware');
const { handleUser } = require('../../middlewares/user.middleware');
const { isAuth } = require('../../middlewares/auth.middleware');

const Router = require('express').Router();

// // Récuperer
Router.get('/:query', isAuth, canGetUser, handleUser, get);

Router.post('/:query/friends', isAuth, canGetUser, handleUser, addFriends);

// // Récuperer tous
// Router.get('/', canGetAllUsers, getAll);

// // Modifier un utilisateur
// Router.patch('/:query', null);

// // Supprimer
// Router.delete('/:query', canDeleteUser, handleUser, remove);

module.exports = Router;