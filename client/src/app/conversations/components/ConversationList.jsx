"use client"

import ConversationItem from "@/app/conversations/components/ConversationItem";
import {fetchConversations} from "@/utils/api";
import {socket} from "@/utils/socket";
import {useEffect, useState} from "react";

const ConversationList = () => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        fetchConversations().then((conversations) => {
            setConversations(conversations);
        });

        socket.connect();

        socket.on('conversation_create', addConversation);

        return (() => {
            socket.off('conversation_create', addConversation);
        });
    }, []);

    const addConversation = (conversation) => {
        setConversations(old => [...old, conversation]);
    }

    const removeConversation = (conversation) => {
        setConversations(old => old.filter(c => c !== conversation));
    }

    return(
        <div className='flex flex-col space-y-2 py-5'>
            {conversations.map(({ _id, name, users }) => (
                <ConversationItem key={_id} _id={_id} name={name} users={users} />
            ))}
        </div>
    )
}

export default ConversationList