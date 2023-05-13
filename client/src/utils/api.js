import axios from "axios";

const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = '80'
const BASE_URL = PROTOCOL + '://' + HOST + ':' + PORT + '/api/v1';

/**
 * Obtenir les conversations
 */
export const fetchUser = async (userId) => {
    const response = await axios.request({
        method: 'GET',
        url: `${BASE_URL}/users/${userId}`,
        withCredentials: true
    });

    return response?.data?.user || null;
}

/**
 * Obtenir les conversations
 */
export const fetchConversations = async () => {
    const response = await axios.request({
        method: 'GET',
        url: `${BASE_URL}/conversations`,
        withCredentials: true
    });

    return response?.data?.conversations || null;
}

/**
 * Obtenir les messages d'un conversations
 * @param {String} conversationId 
 */
export const fetchConversationMessages = async (conversationId) => {
    const response = await axios.request({
        method: 'GET',
        url: `${BASE_URL}/conversations/${conversationId}/messages`,
        withCredentials: true
    });

    return response?.data?.messages || null;
}