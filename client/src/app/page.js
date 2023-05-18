'use client';

import React from 'react'

export default function Home() {
  return (
    <div>
      <div className='flex flex-col justify-center items-center h-screen w-screen text-2xl'>
        Bienvenue sur <stong className='font-bold text-blue-600 underline'>WaveChat</stong>, clique <a href='/conversations'>ici</a> pour commencer à discuter
      </div>
    </div>
  )
}
