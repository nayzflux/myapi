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
    const { user } = req;
    return res.status(200).json({ success: true, user });
}

/**
 * Récuperer tous les utilisateur
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
module.exports.getAll = async (req, res) => {
    const users = await UserModel.find();
    return res.status(200).json({ success: true, users });
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
module.exports.remove = async (req, res) => {
    const { self, user } = req;
    user.remove();
    console.log(`[UTILISATEUR] Compte de ${user.username} supprimé par ${self.username}`);
    res.status(200).json({ success: true, message: "L'utilisateur a été supprimé avec succès", user });
}