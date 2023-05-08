const { Server } = require("socket.io");
const { verifyToken } = require('./token')
const UserModel = require('../models/user.model')

let io;

let users = new Map(); // Non oppérationnel  pour scale

function getCookie(cookie, cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(cookie);
    const cArr = cDecoded.split(';');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

module.exports.createWebsocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });

    // Handle auth
    io.use(async (socket, next) => {
        const token = getCookie(socket.handshake.headers.cookie, "jwt"); // check if token in header

        // Si l'utilisateur n'a pas de token
        if (!token) return next(new Error("Authentification requise"));

        // Décoder le token et verifié sa validité
        const decoded = verifyToken(token);
        if (!decoded) return next(new Error("Authentification invalide"));

        // Récupérer l'utilisateur connecter dans la base de donné
        const self = await UserModel.findOne({ _id: decoded._id }).select("-password");

        // Vérifier si l'utilisateur n'a pas été supprimer
        if (!self) return next(new Error("L'utilisateur n'existe pas"));

        // Stockage des informations d'authentification dans l'objet req pour les fonctions suivantes
        socket.self = self;

        console.log(`WS: Authentifié en tant que ${self.username}`);
        return next();
    })

    // Quand un utilisateur se connecte
    io.on('connection', (socket) => {
        // Stocker l'utilisateur et le socket 
        users.set(socket.id, socket.self._id.toString());
        // Envoyer la connexion
        this.onConnection(socket.self);

        // Envoyer une liste de tout les utilisateurs déjà en ligne
        // for (const user of users.values()) {
        //     socket.emit("user_connection", { username: user.username });
        // }

        // Quand un utilisateur se déconnecte
        socket.on("disconnect", () => {
            // Supprimer l'utilisateur et le socket 
            users.set(socket.id, null);
            // Envoyer la déconnexion
            this.onDisconnection(socket.self);
            console.log("[WS] Client déconnecté");
        });

        console.log("[WS] Client connecté");
    });
}

setInterval(() => {
    console.log(users);
}, 10_000);

module.exports.onMessageCreate = (message) => {
    io.emit('message_create', message)
}

module.exports.onConnection = (user) => {
    io.emit('user_connection', { username: user.username })
}

module.exports.onDisconnection = (user) => {
    io.emit('user_disconnection', { username: user.username })
}

// Lorsqu'un utilisateur commence à taper un message
module.exports.onTyping = (conversation, user) => {
    this.emitToConversation(conversation, 'typing', user);
}

// Lorsqu'un message est envoyer
module.exports.onMessageSend = (conversation, message) => {
    this.emitToConversation(conversation, 'message_create', message)
}

// Emettre sur une conversation
module.exports.emitToConversation = (conversation, event, data) => {
    // ID des utilisateur présent dans la conversation
    const conversationUserIds = conversation.users.map(user => user._id);

    // Envoyer le message a tous les utilisateurs en ligne de la conv
    for (const [socketId, userId] of users.entries()) {
        // Si l'utilisateur fait partit de la conversation
        if (conversationUserIds.includes(userId)) {
            // Envoyer le message sur le socket
            io.to(socketId).emit(event, data);
        }
    }
}