"use client";

import { userState } from '@/atoms/userAtom';
import { formatMessageDate, getConversationDisplayName } from '@/utils/format';
import { socket } from '@/utils/socket';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

const ConversationItem = ({ _id, name, users }) => {
    const [user, setUser] = useRecoilState(userState);
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
        socket.on('message_create', handleLastMessage);

        return (() => {
            socket.off('message_create', handleLastMessage);
        })
    }, []);

    const handleLastMessage = (message) => {
        console.log(message);
        if (message.conversation._id === _id || message.conversation === _id) {
            setLastMessage(message);
        }
    }

    return (
        <div>
            <Link href={`/conversations/${_id}`}>
                <p className='font-semibold'>{getConversationDisplayName({ _id, name, users }, user)}</p>
                <div className='text-sm text-gray-400'>
                    {lastMessage ? `${lastMessage.content} | ${formatMessageDate(lastMessage)}` : users.map((u, i) => i === (users.length - 1) ? u.username : `${u.username}, `)}
                </div>
            </Link>
        </div>
    )
}

export default ConversationItem
