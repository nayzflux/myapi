import React, { useState } from 'react'
import { ArrowLeftIcon, PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { userState } from '@/atoms/userAtom'
import CreateConversationMenu from './CreateConversationMenu'

const ConversationMenuTopBar = () => {
    const [user, setUser] = useRecoilState(userState);
    const [showCreateConversationMenu, setShowCreateConversationMenu] = useState(false)

    const handleShowCreateConversationMenu = (e) => {
        e.preventDefault();

        if (showCreateConversationMenu) {
            setShowCreateConversationMenu(false)
        } else {
            setShowCreateConversationMenu(true)
        }
    }

    return (
        <header className='flex flex-row items-center p-3 bg-white w-full shadow-md'>
            <div className='flex flex-row space-x-5 items-center'>
                {/* Back button */}
                <button className='w-8 h-8'>
                    <Link href={`/`}><ArrowLeftIcon /></Link>
                </button>

                {/* User acount name */}
                <p className='font-bold'>{user?.username}</p>
            </div>

            <div className='ml-auto flex flex-row space-x-2 items-center'>
                {/* Create conv */}
                <button className='w-8 h-8' onClick={handleShowCreateConversationMenu}>
                    <PencilSquareIcon />
                </button>

                {/* Account setting */}
                <button className='w-8 h-8'>
                    <Link href={`/account/profile`}><UserCircleIcon /></Link>
                </button>
            </div>
            {showCreateConversationMenu ? <CreateConversationMenu /> : null}
        </header>
    )
}

export default ConversationMenuTopBar
