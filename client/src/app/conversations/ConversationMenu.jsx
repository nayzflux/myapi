'use client';

import { convState } from '@/atoms/convAtom';
import { fetchConversations } from '@/utils/api';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import ConversationItem from './ConversationItem';
import SearchUser from '@/components/SearchUser';

const ConversationMenu = () => {
    const [conversations, setConversations] = useState([]);
    const [conv, setConv] = useRecoilState(convState);

    useEffect(() => {
        fetchConversations().then((conversations) => {
            setConversations(conversations);
        });
    }, []);

    const addConversation = (message) => {
        setMessages(old => [...old, message]);
    }

    const removeConversation = (message) => {
        setMessages(old => old.filter(m => m !== message));
    }

    return (
        <div>
            {/* Search */}
            <SearchUser/>
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
