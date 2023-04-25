const UserModel = require("../models/user.model");
const { signToken } = require("../utils/token");
const { isValidEmail, isValidUsername } = require("../utils/utils");

/**
 * Récuperer un utilisateur
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
module.exports.get = async (req, res) => {

}

/**
 * Récuperer tous les utilisateur
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
module.exports.getAll = async (req, res) => {

}

/**
 * Modifier un utilisateur
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
module.exports.update = async (req, res) => {

}

/**
 * Supprimer un utilisateur
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
module.exports.delete = async (req, res) => {

}