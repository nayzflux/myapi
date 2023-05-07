const { Server } = require("socket.io");

let io;

module.exports.createWebsocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });

    // Handle auth
    // io.use(async (socket, next) => {
    //     const token = socket.handshake?.auth?.jwt || socket.handshake.headers?.jwt; // check if token in header or in socket.io auth

    //     console.log(token);

    //     // Si l'utilisateur n'a pas de token
    //     if (!token) return next(new Error("Authentification requise"));

    //     // Décoder le token et verifié sa validité
    //     const decoded = verifyToken(token);
    //     if (!decoded) return next(new Error("Authentification invalide"));

    //     // Récupérer l'utilisateur connecter dans la base de donné
    //     const self = await UserModel.findOne({ _id: decoded._id }).select("-password");

    //     // Vérifier si l'utilisateur n'a pas été supprimer
    //     if (!self) return next(new Error("L'utilisateur n'existe pas"));

    //     // Stockage des informations d'authentification dans l'objet req pour les fonctions suivantes
    //     socket.self = self;

    //     console.log(`WS: Authentifié en tant que ${self.username}`);
    //     return next();
    // })

    // Quand un utilisateur se connecte
    io.on('connection', (socket) => {
        console.log("Client connecté");
    });
}

module.exports.onMessageCreate = (message) => {
    io.emit('message_create', message)
}

module.exports.onTyping = (user) => {
    io.emit('typing', { username: user.username })
}