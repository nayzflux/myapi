'use client';

import { convState } from '@/atoms/convAtom';
import axios from 'axios';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';

const ChatInput = () => {
    const [message, setMessage] = useState('');
    const [conv, setConv] = useRecoilState(convState);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.request(
            {
                url: 'http://localhost:80/api/v1/conversations/' + conv._id + '/messages',
                method: 'POST',
                data: {
                    content: message
                },
                withCredentials: true
            }
        ).then(res => {
            console.log("messages sent");
            setMessage('')
        }).catch(err => {
            console.log(err);
        });
    }

    const handleTyping = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }

    return (
        <div className='py-10'>
            <form className='flex flex-row' onSubmit={handleSubmit}>
                <input type='text' placeholder='Entrer un message' value={message} onChange={handleTyping} />
                <input type='submit' />
            </form>
        </div>
    )
}

export default ChatInput
