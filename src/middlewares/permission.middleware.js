module.exports.canGetAllUsers = async (req, res, next) => {
    const { self } = req;

    if (self.role !== "Admin") {
        return res.status(403).json({ success: false, message: "Vous n'avez pas l'autorisation d'accéder à cette ressources" });
    }

    return next();
}

module.exports.canGetUser = async (req, res, next) => {
    const { self } = req;
    const { query } = req;

    // Si l'utilisateur est admin alors il a accès complet
    if (self.role === "Admin") {
        req.restriced = true;
        return next();
    }

    // Si l'utilisateur s'obtient lui meme alors il a un accès complet à la ressources
    if (self._id === query || self.email === query || self.username === query || query === "@me") {
        req.restriced = false;
        return next();
    }

    // Sinon il a un accès restreint
    req.restriced = true;
    return next();
}

module.exports.canDeleteUser = async (req, res, next) => {
    const { self } = req;

    // Si l'utilisateur est admin
    if (self.role === "Admin") {
        return next();
    }

    // Si l'utilisateur s'obtient lui meme alors il a un accès complet à la ressources
    if (self._id === query || self.email === query || self.username === query || query === "@me") {
        return next();
    }

    return res.status(403).json({ success: false, message: "Vous n'avez pas l'autorisation d'effectuer cette action" });
}