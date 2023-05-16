const { Server } = require("socket.io");
const { verifyToken } = require('./token')
const UserModel = require('../models/user.model')

let io;

let users = new Map(); // Non oppérationnel  pour scale
let fetchUsers = new Map();

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
            origin: process.env.CLIENT_URL,
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

        console.log(`[WS] Authentifié en tant que ${self.username}`);
        return next();
    })

    // Quand un utilisateur se connecte
    io.on('connection', (socket) => {
        // Stocker l'utilisateur et le socket 
        users.set(socket.id, socket.self._id.toString());
        fetchUsers.set(socket.id, socket.self);

        // Mettre le status en ligne
        setStatus(socket, true)

        // Envoyer la connexion
        this.onConnection(socket.self);

        // Envoyer une liste de tout les utilisateurs déjà en ligne
        // for (const user of fetchUsers.values()) {
        //     // Seulement les amis de l'utilisateur
        //     if (user) {
        //         if (user.friends.includes(self._id)) {
        //             socket.emit("user_connection", { _id: user._id, username: user.username, picture: { url: user.picture?.url } });
        //         }
        //     }
        // }

        // Quand un utilisateur se déconnecte
        socket.on("disconnect", () => {
            // Supprimer l'utilisateur et le socket 
            users.set(socket.id, null);
            fetchUsers.set(socket.id, null);
            // Mettre le status hors ligne
            setStatus(socket, false)
            // Envoyer la déconnexion
            this.onDisconnection(socket.self);
        });
    });
}

const setStatus = async (socket, status) => {
    const user = await UserModel.findOneAndUpdate({ _id: socket.self._id }, { isOnline: status })
}

// Lorsqu'un utilisateur se connecte
module.exports.onConnection = (user) => {
    console.log(`[WS] -> ${user.username} s'est connecté`);
    this.emitToFriends(user, 'user_connection', { _id: user._id, username: user.username, picture: { url: user.picture?.url } })
    // io.emit('user_connection', { _id: user._id, username: user.username, picture: { url: user.picture?.url } })
}

// Lorsqu'un utilisateur se déconnecte
module.exports.onDisconnection = (user) => {
    console.log(`[WS] -> ${user.username} s'est déconnecté`);
    this.emitToFriends(user, 'user_disconnection', { _id: user._id, username: user.username, picture: { url: user.picture?.url } })
    // io.emit('user_disconnection', { _id: user._id, username: user.username, picture: { url: user.picture?.url } })
}

// Lorsqu'un utilisateur commence à taper un message
module.exports.onTyping = (conversation, user) => {
    console.log(`[WS] -> ${user.username} est en en train d'écrire dans ${conversation.name}`);
    this.emitToConversation(conversation, 'typing', user);
}

// Lorsqu'un message est envoyer
module.exports.onMessageSend = (conversation, message) => {
    console.log(`[WS] -> Message envoyée dans la conversation ${conversation.name}`);
    this.emitToConversation(conversation, 'message_create', message)
}

// Lorsqu'une conversation est créer
module.exports.onConversationCreate = (conversation) => {
    console.log(`[WS] -> La conversation ${conversation.name} a été créer`);
    this.emitToConversation(conversation, 'conversation_create', conversation)
}

// Lorsqu'une conversation est quitter
module.exports.onConversationLeave = (conversation, user) => {
    console.log(`[WS] -> ${user.username} a quitté la conversation ${conversation.name}`);
    this.emitToConversation(conversation, 'conversation_leave', ({ _id: user._id, username: user.username }, { _id: user._id, username: user.username }))
}

// Emettre sur une conversation
module.exports.emitToConversation = (conversation, event, data) => {
    // ID des utilisateur présent dans la conversation
    const conversationUserIds = conversation.users.map(user => user._id.toString());

    // Envoyer le message a tous les utilisateurs en ligne de la conv
    for (const [socketId, userId] of users.entries()) {
        // Si l'utilisateur fait partit de la conversation
        if (conversationUserIds.includes(userId)) {
            // Envoyer le message sur le socket
            io.to(socketId).emit(event, data);
        }
    }
}

// Emmetre au ami d'un utilisateur
module.exports.emitToFriends = (user, event, data) => {
    console.log(user.friends);

    // Envoyer l'event a tous les amis en ligne de l'utilisateur
    for (const [socketId, userId] of users.entries()) {
        // Si l'utilisateur fait partit de la conversation
        if (user.friends?.includes(userId)) {
            // Envoyer le message sur le socket
            io.to(socketId).emit(event, data);
        }
    }
}