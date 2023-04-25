const Router = require('express').Router();

// Récuperer
Router.get('/:user', null);

// Récuperer tous
Router.get('/', null);

// Modifier un utilisateur
Router.patch('/:user', null);

// Supprimer
Router.delete('/:user', null);

module.exports = Router;