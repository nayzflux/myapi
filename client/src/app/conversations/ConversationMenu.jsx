'use client';

import { convState } from '@/atoms/convAtom';
import { fetchConversations } from '@/utils/api';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import ConversationItem from './ConversationItem';
import SearchUser from '@/components/SearchUser';
import { socket } from '@/utils/socket';

const ConversationMenu = () => {
    const [conversations, setConversations] = useState([]);
    const [conv, setConv] = useRecoilState(convState);

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

    return (
        <div>
            {/* Search */}
            <SearchUser />
            {/* Active friends */}
            <div className='space-y-2 p-3'>
                {
                    conversations.map(({ _id, name, users }) => (
                        <ConversationItem key={_id} _id={_id} name={name} users={users} />
                    ))
                }
            </div>
        </div>
    )
}

export default ConversationMenu
