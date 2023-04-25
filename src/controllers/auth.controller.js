const UserModel = require("../models/user.model");
const { signToken } = require("../utils/token");
const { isValidEmail, isValidUsername } = require("../utils/utils");

/**
 * Gérer la création d'utilisateur
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
module.exports.register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Si certains champs sont vides
    if (!username || !email || !password || !confirmPassword) return res.status(400).json({ success: false, message: "Merci de remplir tous les  champs" });

    // Si les mots de passe sont différents
    if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Les mots de passe doivent correspondre" });

    // Vérifier email et username
    if (!isValidEmail(email)) return res.status(400).json({ success: false, message: "Merci de fournir une email valide" });
    if (!isValidUsername(username)) return res.status(400).json({ success: false, message: "Seul les lettres, les chiffres, le ., le - et le _ sont acceptés dans le nom d'utilisateur" });

    // Si l'email ou le om d'utilisateur est déjà utilisé
    const doesUsernameAlreadyUsed = await UserModel.exists({ username });
    const doesEmailAlreadyUsed = await UserModel.exists({ username });
    if (doesUsernameAlreadyUsed) return res.status(400).json({ success: false, message: "Ce nom d'utilisateur est déjà utilisé" });
    if (doesEmailAlreadyUsed) return res.status(400).json({ success: false, message: "Cette email est déjà utilisée" });

    // Le password serait hasher plus tard
    const user = await UserModel.create({ username, email, password })
        .select('-password');

    // Sauvegarder le cookie avec le token
    const token = signToken(user);

    // à vérifier pour la sécurité des cookie
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.JWT_SECURE_COOKIE });
    return res.status(201).json({ success: true, message: "Utilisateur créer avec succès", user: user });
}

module.exports.login = (req, res) => {
}

module.exports.logout = (req, res) => {

}