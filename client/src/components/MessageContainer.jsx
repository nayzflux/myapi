import { convState } from '@/atoms/convAtom'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Message from './Message';
import axios from 'axios';
import { io } from 'socket.io-client';

const MessageContainer = () => {
    const [conv, setConv] = useRecoilState(convState);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.request(
            {
                url: `http://localhost:80/api/v1/conversations/${conv._id}/messages?limit=25`,
                method: 'GET',
                withCredentials: true
            }
        ).then(res => {
            console.log("Message get");
            setMessages(res.data.messages);
        }).catch(err => {
            console.log("Message error");
        });


        const socket = io("ws://localhost:80", { withCredentials: true });

        const addMessage = (message) => setMessages(prevMessages => [...prevMessages, message]);

        const handleNewMessage = (message) => {
            console.log("new message incoming");
            if (message.conversation._id.toString() === conv._id.toString()) {
                console.log("for this conv");
                addMessage(message);
            }
        }

        socket.on("message_create", handleNewMessage);

        return () => {
            socket.off('message_create', handleNewMessage);
        }
    }, [conv]);

    return (
        <div className='space-y-2'>
            {messages.map(m => <Message key={m._id} author={m.author} created_at={m.created_at} content={m.content} id={m._id} />)}
        </div>
    )
}

export default MessageContainer
