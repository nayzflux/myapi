const { Server } = require("socket.io");

let io;

module.exports.createWebsocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });
}

module.exports.onMessageCreate = (message) => {
    io.emit('message_create', message)
}