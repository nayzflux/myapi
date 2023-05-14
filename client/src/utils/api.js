import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
export const fetchConversation = async (conversationId) => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: `${BASE_URL}/conversations/${conversationId}`,
            withCredentials: true
        });

        return response?.data?.conversation || null;
    } catch (err) {
        return null;
    }
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

/**
 * Obtenir les messages d'un conversations
 * @param {String} conversationId 
 * @param {String} content 
 */
export const sendMessage = async (conversationId, content) => {
    const response = await axios.request({
        method: 'POST',
        url: `${BASE_URL}/conversations/${conversationId}/messages`,
        data: {
            content
        },
        withCredentials: true
    });

    return response?.data?.message || null;
}

export const searchUser = async (query) => {
    console.log("search");

    const response = await axios.request({
        method: 'GET',
        url: `${BASE_URL}/users/search/${query}?limit=25`,
        withCredentials: true
    });

    return response?.data?.users || null;
}