const { isValidObjectId } = require("mongoose");
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

module.exports.addFriends = async (req, res) => {
    const { self, user } = req;
    const { users } = req.body;

    // Si certains champs sont vides
    if (!users || users?.length === 0) return res.status(400).json({ success: false, message: "Merci de spécifié au moins un utilisateur" });

    for (const id of users) {
        if (!isValidObjectId(id)) return res.status(400).json({ success: false, message: `${id} n'est pas un ID valide` });
    }

    // Récupérer les users
    const fetchUsers = await UserModel.find({ '_id': { $in: users } });

    if (users?.length !== fetchUsers?.length) return res.status(404).json({ success: false, message: "Certains utilisateurs spécifié sont introuvable" });

    const newUser = await UserModel.findOneAndUpdate({ _id: user._id }, { $addToSet: { "friendsRequest.sent": users } }, { new: true }).populate('friendsRequest.sent', '-email').exec();

    const ok = await UserModel.updateMany({ '_id': { $in: users } }, { $addToSet: { "friendsRequest.received": [user._id] } }, {new: true});

    return res.status(200).json({ success: true, user: newUser });
}