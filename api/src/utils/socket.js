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
        console.log("WS: Client connecté");
        users = [...users, socket.self];
        this.onConnection(socket.self);

        for (const u of users) {
            socket.emit("user_connection", { username: u.username });
        }

        socket.on("disconnect", () => {
            console.log("WS: Client déconnecté");
            users = users.filter(u => u !== socket.self);
            this.onDisconnection(socket.self);
        });
    });
}

setInterval(() => {
    console.log(users);
}, 10_000)

module.exports.onMessageCreate = (message) => {
    io.emit('message_create', message)
}

module.exports.onTyping = (user) => {
    io.emit('typing', { username: user.username })
}

module.exports.onConnection = (user) => {
    io.emit('user_connection', { username: user.username })
}

module.exports.onDisconnection = (user) => {
    io.emit('user_disconnection', { username: user.username })
}