import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "wss://api.chatapp.nayz.fr", {
    autoConnect: false,
    withCredentials: true
})