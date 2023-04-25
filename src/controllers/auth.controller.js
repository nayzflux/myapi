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
    console.log("[AUTH] Création d'un utilisateur...");

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

    console.log("[AUTH] Utilisateur créé");

    // à vérifier pour la sécurité des cookie
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.JWT_SECURE_COOKIE });
    return res.status(201).json({ success: true, message: "Utilisateur créer avec succès", user: user });
}

/**
 * Gérer la connexion d'utilisateur
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
module.exports.login = async (req, res) => {
    console.log("[AUTH] Connexion d'un utilisateur");

    const { login, password } = req.body;

    // Si certains champs sont vides
    if (!login || !password) return res.status(400).json({ success: false, message: "Merci de remplir tous les  champs" });

    // Obtenir l'utilisateur avec l'adresse email puis avec le nom d'utilisateur
    const user = await UserModel.exists({ username }) || await UserModel.exists({ username });

    // Vérifier si l'utilisateur existe
    if (!user) return res.status(404).json({ success: false, message: "Aucun n'utilisateur n'existe avec cette email ou ce nom d'utilisateur" });

    // Comparer les mot de passe
    const doesPasswordMatch = user.verify(password)
    if (!doesPasswordMatch) return res.status(401).json({ success: false, message: "Mot de passe incorrect" });

    // Sauvegarder le cookie avec le token
    const token = signToken(user);

    console.log("[AUTH] Utilisateur connecté");

    // à vérifier pour la sécurité des cookie
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.JWT_SECURE_COOKIE });
    return res.status(200).json({ success: true, message: `Connexion à l'utilisateur effectué avec succès`, user: { _id: user._id, email: user.email, username: user.username, role: user.role } });
}

/**
 * Gérer la déconnexion
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
module.exports.logout = async (req, res) => {
    console.log("[AUTH] Deconnexion d'un utilisateur");
    // Detruire le cookie
    res.cookie('jwt', "", { maxAge: 1, httpOnly: true, secure: process.env.JWT_SECURE_COOKIE });
    return res.status(200).json({ success: true, message: `Deconnecté avec succès` });
}