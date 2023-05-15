'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <p>Bienvenue sur ChatApp clique ici pour commencer à discuter</p>
        <Link href='/conversation'>Voir les conversations</Link>
      </div>
    </div>
  )
}
