const UserModel = require("../models/user.model");

/**
 * Obtenir l'utilisateur
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {} next 
 */
module.exports.handleUser = async (req, res, next) => {
    const { query } = req.params;
    const { self, restricted } = req;

    // Si l'utilisateur se récupère lui meme
    if (query === "@me" || query === self._id || query === self.email || query === self.username) {
        req.user = self;
        return next();
    }

    // Récupérer l'utilisateur par son id, son email ou son nom d'utilisateur
    const user = await UserModel.findOne({ $or: [{ _id: query }, { email: { $eq: query } }, { username: { $eq: query } }] })
        .select(restricted ? '' : '+email').populate("friends"); // gérer les données afficher en fonction de l'autorisation

    // Si l'utilisateur n'existe pas
    if (!user) return res.status(404).json({ success: false, message: "L'utilisateur n'existe pas" });

    req.user = user;
    return next();
}

module.exports.isFriend = async (req, res, next) => {
    const { self, user } = req;

    if (user.friends?.includes({_id: self._id })) {
        next();
    }

    return res.status(403).json({ success: false, message: "Vous n'êtes pas ami avec l'utilisateur" });
}