'use client';
import { convState } from '@/atoms/convAtom';
import { fetchConversationMessages } from '@/utils/api';
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import Message from './Message';

const Conversation = () => {
  const [input, setInput] = useState('');
  const [conv, setConv] = useRecoilState(convState);
  const bottom = useRef(null);
  const [messages, setMessages] = useState([
    // {
    //   self: false,
    //   content: 'hello'
    // },
    // {
    //   self: true,
    //   content: 'how are you?'
    // },
    // {
    //   self: false,
    //   content: 'fine and you?'
    // },
    // {
    //   self: true,
    //   content: 'good'
    // },
    // {
    //   self: true,
    //   content: 'what are you doing?'
    // },
    // {
    //   self: false,
    //   content: 'i am playing videogames'
    // },
    // {
    //   self: false,
    //   content: 'hello'
    // },
    // {
    //   self: true,
    //   content: 'how are you?'
    // },
    // {
    //   self: false,
    //   content: 'fine and you?'
    // },
    // {
    //   self: true,
    //   content: 'good'
    // },
    // {
    //   self: true,
    //   content: 'what are you doing?'
    // },
    // {
    //   self: false,
    //   content: 'i am playing videogames'
    // },
    // {
    //   self: false,
    //   content: 'hello'
    // },
    // {
    //   self: true,
    //   content: 'how are you?'
    // },
    // {
    //   self: false,
    //   content: 'fine and you?'
    // },
    // {
    //   self: true,
    //   content: 'good'
    // },
    // {
    //   self: true,
    //   content: 'what are you doing?'
    // },
    // {
    //   self: false,
    //   content: 'i am playing videogames'
    // },
    // {
    //   self: false,
    //   content: 'hello'
    // },
    // {
    //   self: true,
    //   content: 'how are you?'
    // },
    // {
    //   self: false,
    //   content: 'fine and you?'
    // },
    // {
    //   self: true,
    //   content: 'good'
    // },
    // {
    //   self: true,
    //   content: 'what are you doing?'
    // },
    // {
    //   self: false,
    //   content: 'i am playing videogames'
    // },
    // {
    //   self: false,
    //   content: 'hello'
    // },
    // {
    //   self: true,
    //   content: 'how are you?'
    // },
    // {
    //   self: false,
    //   content: 'fine and you?'
    // },
    // {
    //   self: true,
    //   content: 'good'
    // },
    // {
    //   self: true,
    //   content: 'what are you doing?'
    // },
    // {
    //   self: false,
    //   content: 'i am playing videogames'
    // },
    // {
    //   self: false,
    //   content: 'hello'
    // },
    // {
    //   self: true,
    //   content: 'how are you?'
    // },
    // {
    //   self: false,
    //   content: 'fine and you?'
    // },
    // {
    //   self: true,
    //   content: 'good'
    // },
    // {
    //   self: true,
    //   content: 'what are you doing?'
    // },
    // {
    //   self: false,
    //   content: 'i am playing videogames'
    // }
  ]);

  useEffect(() => {
    fetchConversationMessages(conv._id).then((messages) => {
      setMessages(messages);
    });
  }, [conv]);

  const addMessages = (message) => {
    setMessages(old => [...old, message]);
  }

  const removeMessages = (message) => {
    setMessages(old => old.filter(m => m !== message));
  }

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const handleReturn = (e) => {
    e.preventDefault();
    setConv(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessages({ content: input, self: true });
    setInput('');
    simulateReponse()
  }

  const simulateReponse = () => {
    setTimeout(() => {
      const r = (Math.random() + 1).toString(36).substring(2);
      addMessages({ content: r, self: false });
    }, (Math.random() * 3) * 1_000);
  }

  return (
    <div className='flex flex-col max-h-full min-h-screen'>
      <header className='flex flex-row items-center p-3 fixed bg-white w-full shadow-md'>
        {/* Back button */}
        <button onClick={handleReturn}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg></button>
        {/* Conversation title */}
        <div className='flex flex-row px-4 items-center space-x-2'>
          {/* Users profile picture */}
          <img alt='profile picture' className='w-8 h-8 rounded-full' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' />
          <div className='flex flex-col'>
            {/* Name */}
            <p className='text-xs font-bold'>Conversation avec NayZ</p>
            {/* User list */}
            <p className='text-sm text-gray-400'>nayz</p>
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
          messages.map(({ _id, content, author }) => (
            <Message key={_id} content={content} author={author} />
          ))
        }
      </div>
      {/* Chat input */}
      <div className='p-3'>
        <form className='flex flex-row justify-center w-full space-x-2 items-center border-2 rounded-full pl-3 pr-1 py-1' onSubmit={handleSubmit} ref={bottom}>
          <input type='text' placeholder='Taper votre message...' className='w-full border-opacity-60 placeholder:text-black h-8 outline-none' value={input} onChange={handleInput} />
          <input type='submit' className={input === '' ? 'hidden' : 'bg-blue-400 w-8 h-8 rounded-full'} value='envoyer' />
        </form>
      </div>
    </div >
  )
}

export default Conversation;
