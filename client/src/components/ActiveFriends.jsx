import { userState } from '@/atoms/userAtom';
import { createConversation, fetchUser } from '@/utils/api';
import { socket } from '@/utils/socket';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { PlusIcon } from '@heroicons/react/24/outline';

const ActiveFriends = () => {
    const [onlines, setOnlines] = useState([]);
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter();

    useEffect(() => {
        // Ajouter tous les amis en lignes à la listes de amis en ligne
        user?.friends?.map((friend) => friend.isOnline && addOnline(friend))

        socket.on('user_connection', addOnline);
        socket.on('user_disconnection', removeOnline);

        return (() => {
            socket.off('user_connection', addOnline);
            socket.off('user_disconnection', removeOnline);
        });
    }, [user]);

    const handleConversationButton = (e, user) => {
        e.preventDefault();
        console.log("Handle Conversation button");

        createConversation([user._id], null)
            .then(conversation => {
                // Si la conv est créer
                if (conversation) {
                    router.push(`/conversations/${conversation._id}`)
                }
            })
            .catch(conversation => {
                // Si la conv existe déjà
                if (conversation) {
                    router.push(`/conversations/${conversation._id}`)
                } else {
                    console.log("Error");
                }
            });
    }

    const addOnline = (online) => {
        setOnlines(old => old.find(u => u._id.toString() === online._id.toString()) ? old : [...old, online]);
    }

    const removeOnline = (online) => {
        setOnlines(old => old.filter(o => o._id.toString() !== online._id.toString()));
    }

    return (
        <div>
            <h3>Amis en ligne</h3>
            <div className='flex flex-row space-x-1 overflow-auto'>
                {/* Current User */}
                {user ?
                    <div className='flex flex-col' key={user?._id}>
                        <div className='relative'>
                            <img className='rounded-full w-12 h-12' src={user?.picture?.url} alt="Photo de Profile" />
                            {user?.note ? <button className='text-white bg-gray-600 absolute left-0 top-0 rounded-full w-max text-xs px-1'>{user.note}</button> : <button className='text-white bg-gray-600 absolute right-0 top-0 rounded-full w-4 h-4'><PlusIcon className='text-white' /></button>}
                        </div>
                        <p>{user?.username}</p>
                    </div>
                    : ""}
                {onlines.map(user => (
                    <div className='flex flex-col' key={user._id} onClick={(e) => handleConversationButton(e, user)}>
                        <div className='relative'>
                            <img className='rounded-full w-12 h-12' src={user?.picture?.url} alt="Photo de Profile" />
                            {user?.note && <p className='text-white bg-gray-600 absolute left-0 top-0 rounded-full w-max text-xs px-1'>{user.note}</p>}
                        </div>
                        <p>{user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActiveFriends
