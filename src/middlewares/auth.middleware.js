const UserModel = require("../models/user.model");
const { verifyToken } = require("../utils/token");

/**
 * Gérer l'authentification
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {} next 
 */
module.exports.isAuth = async (req, res, next) => {
    const token = req.cookies?.jwt;

    // Si l'utilisateur n'a pas de token
    if (!token) return res.status(401).json({ message: "Authentification requise" });

    // Décoder le token et verifié sa validité
    const decoded = verifyToken(token);
    if (!decoded) return res.status(403).json({ message: "Authentification invalide" });

    // Récupérer l'utilisateur connecter dans la base de donné
    const self = await UserModel.findOne({ _id: decoded._id }).select("-password");

    // Vérifier si l'utilisateur n'a pas été supprimer
    if (!self) return res.status(404).json({ message: "L'utilisateur n'existe pas" });

    // Stockage des informations d'authentification dans l'objet req pour les fonctions suivantes
    req.self = self;

    console.log(`Authentifié en tant que ${self.username}`);
    return next();
}