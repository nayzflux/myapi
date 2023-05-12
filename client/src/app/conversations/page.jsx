import React from 'react'

const ConversationPage = () => {
  return (
    <div className='flex flex-col p-2 h-screen'>
      <header className='flex flex-row items-center'>
        {/* Back button */}
        <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg></button>
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
      <div className='flex flex-col space-y-2 py-4 flex-grow justify-end'>
        {/* Message */}
        <div className='flex flex-row space-x-2'>
          <img className='w-7 h-7 rounded-full' alt='profile picture' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
          <p className='px-3 py-1 rounded-full text-sm bg-gray-200'>Hello everyone</p>
        </div>
        <div className='flex flex-row ml-auto space-x-2'>
          <p className='px-3 py-1 rounded-full text-sm bg-blue-600 text-white'>Hello everyone</p>
        </div>
      </div>
      {/* Chat input */}
      <form className='mt-auto flex'>
        <input type='text' placeholder='Taper votre message...' className='border-2 rounded-full px-3 py-1 border-opacity-60 placeholder:text-black'/>
        <input type='submit' />
      </form>
    </div>
  )
}

export default ConversationPage
