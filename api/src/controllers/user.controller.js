const { isValidObjectId } = require("mongoose");
const UserModel = require("../models/user.model");

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
 * Récuperer tous les utilisateur
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
module.exports.search = async (req, res) => {
    const { query } = req.params;
    const { limit } = req.query;

    const users = await UserModel.find({ username: { $regex: "^" + query } })
        .limit(limit || 25)
        .exec();

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
    // Supprimer l'utilisateur
    user.remove();
    console.log(`[UTILISATEUR] Compte de ${user.username} supprimé par ${self.username}`);
    res.status(200).json({ success: true, message: "L'utilisateur a été supprimé avec succès", user });
}

module.exports.addFriend = async (req, res) => {
    const { self, user } = req;
    const { user: target } = req.body;

    // Si il n'y a pas l'ID de la cible
    if (!target) return res.status(400).json({ success: false, message: "Merci de précisé l'utilisateur à qui vous souhaitez envoyé une demande d'ami" });

    // Si l'ID de la cible n'est pas valide
    if (!isValidObjectId(target)) return res.status(400).json({ success: false, message: `${id} n'est pas un ID valide` });

    // Récupérer la cible
    const fetchTarget = await UserModel.findOne({ _id: target });

    // Si la cible n'existe pas
    if (!fetchTarget) return res.status(404).json({ success: false, message: "L'utilisateur est introuvable" });

    // Si la cible et l'utilisateur sont déjà ami
    if (fetchTarget.friends?.includes(self._id)) {
        return res.status(400).json({ success: false, message: `Vous êtes déjà ami avec ${fetchTarget.username}` });
    }

    // Si l'utilisateur avons déjà envoyé une demande d'ami à la cible
    if (fetchTarget.friendsRequest?.received?.includes(user._id)) {
        return res.status(400).json({ success: false, message: `Vous avez déjà envoyé une demande d'ami à ${fetchTarget.username}`, });
    }

    // Si la cible a déjà envoyé une demande d'ami à l'utilisateur
    if (fetchTarget.friendsRequest?.sent?.includes(user._id)) {
        // Ajouter la cible à l'utilisateur
        await UserModel.findOneAndUpdate({ _id: user._id }, { $addToSet: { "friends": fetchTarget._id } }, { new: true });
        // Ajouter lal'utilissateur à la cible
        await UserModel.findOneAndUpdate({ _id: fetchTarget._id }, { $addToSet: { "friends": user._id } }, { new: true });
        return res.status(200).json({ success: true, message: `Vous êtes désormais ami avec ${fetchTarget.username}`, });
    }

    // Envoyer la demande à la cible
    await UserModel.findOneAndUpdate({ _id: fetchTarget._id }, { $addToSet: { "friendsRequest.received": user._id } }, { new: true });
    // Enregistrer l'envoie
    await UserModel.findOneAndUpdate({ _id: user._id }, { $addToSet: { "friendsRequest.sent": fetchTarget._id } }, { new: true });
    return res.status(200).json({ success: true, message: `Vous avez envoyé une demande d'ami à ${fetchTarget.username}` });
}