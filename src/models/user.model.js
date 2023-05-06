const bcrypt = require('bcrypt');
const saltRounds = 10;

const roles = require('../roles.json')

const mongoose = require("mongoose");

// à modifier rajouter des vérifs
const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
        role: {
            type: String,
            default: roles[0].name
        }
    }
);

// Avant de sauvegarder l'utilisateur
userSchema.pre('save', function (next) {
    const user = this;

    // Si le mot de passe n'est pas modifier
    if (!user.isModified('password')) return next();

    // Hasher le mot de passe
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // Remplacer le mot de passe en clair par notre hash
            user.password = hash;
            return next();
        });
    });
});

// Comparer les mots de passes
userSchema.statics.verifyPassword = async function (user, password) {
    const isMatch = bcrypt.compare(password, user.password);
    return isMatch;
};

const UserModel = mongoose.model("User", userSchema, "users");

module.exports = UserModel;