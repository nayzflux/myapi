'use client';

import { fetchConversationMessages, sendMessage } from '@/utils/api';
import React, { useEffect, useState } from 'react'
import Message from './Message';
import Link from 'next/link';
import { socket } from '@/utils/socket';
import { useRecoilState } from 'recoil';
import { userState } from '@/atoms/userAtom';
import { getConversationDisplayName } from '@/utils/format';

const Conversation = ({ _id, name, users }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    console.log("Fetching messages");
    fetchConversationMessages(_id).then((messages) => {
      setMessages(messages);
    });

    socket.on('message_create', addMessages)

    return (() => {
      socket.off('message_create', addMessages);
    });
  }, []);

  const addMessages = (message) => {
    if (message.conversation._id === _id) {
      console.log("Message added in conversation");
      setMessages(old => [...old, message]);
    } else {
      console.log("Message added in other conversation");
    }
  }

  const removeMessages = (message) => {
    setMessages(old => old.filter(m => m !== message));
  }

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(_id, input);
    setInput('');
  }

  return (
    <div className='flex flex-col max-h-full min-h-screen'>
      <header className='flex flex-row items-center p-3 fixed bg-white w-full shadow-md'>
        {/* Back button */}
        <button><Link href={`/conversations`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg></Link></button>
        {/* Conversation title */}
        <div className='flex flex-row px-4 items-center space-x-2'>
          {/* Users profile picture */}
          <img alt='profile picture' className='w-8 h-8 rounded-full' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' />
          <div className='flex flex-col'>
            {/* Name */}
            <p className='text-xs font-bold'>{getConversationDisplayName({ _id, name, users }, user)}</p>
            {/* User list */}
            <p className='text-sm text-gray-400'>{users.map((u, i) => i === (users.length - 1) ? u.username : `${u.username}, `)}</p>
          </div>
        </div>
        {/* Info button */}
        <button className='ml-auto'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </button>
      </header>
      {/* Message container */}
      <div className='px-3 flex flex-col space-y-2 justify-end mt-auto'>
        {/* Message */}
        {
          messages.map((message) => (
            <Message key={message._id} content={message.content} author={message.author} />
          ))
        }
      </div>
      {/* Chat input */}
      <div className='p-3'>
        <form className='flex flex-row justify-center w-full space-x-2 items-center border-2 rounded-full pl-3 pr-1 py-1' onSubmit={handleSubmit}>
          <input type='text' placeholder='Taper votre message...' className='w-full border-opacity-60 placeholder:text-black h-8 outline-none' value={input} onChange={handleInput} />
          <input type='submit' className={input === '' ? 'hidden' : 'bg-blue-400 w-8 h-8 rounded-full'} value='envoyer' />
        </form>
      </div>
    </div >
  )
}

export default Conversation;
