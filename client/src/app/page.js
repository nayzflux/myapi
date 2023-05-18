'use client';

import React from 'react'
import Link from "next/link";

export default function Home() {
  return (
      <div className='flex flex-col justify-center h-screen items-center text-xl space-y-10 p-3 text-center'>
          <h1>Bienvenue sur l'application de messsagerie <stong className='font-bold text-blue-600 underline'>WaveChat</stong>,<br/>Clique ci-dessous pour t'inscrire et commencer à discuter</h1>
          <Link href="/conversations" >
              <button className="rounded-full bg-blue-600 py-2 px-4 text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all ease-out duration-300">C'est parti</button>
          </Link>
      </div>
  )
}
