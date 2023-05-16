import { userState } from '@/atoms/userAtom';
import { createConversation, fetchUser } from '@/utils/api';
import { socket } from '@/utils/socket';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

const ActiveFriends = () => {
    const [onlines, setOnline] = useState([]);
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter();

    useEffect(() => {
        console.log(user);
        console.log("ok");
        setOnline(user?.friends?.filter(u => u.isOnline === true) || [])

        socket.connect();

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
        setOnline(old => old.find(u => u._id.toString() === online._id.toString()) ? old : [...old, online]);
    }

    const removeOnline = (online) => {
        setOnline(old => old.filter(o => o._id.toString() !== online._id.toString()));
    }

    return (
        <div>
            <h3>Amis en ligne</h3>
            <div className='flex flex-row space-x-1 overflow-auto'>
                {/* Current User */}
                <div className='flex flex-col' key={user._id}>
                    <img className='rounded-full w-12 h-12' src={user.picture?.url} alt="Photo de Profile" />
                    <p>{user.username}</p>
                </div>
                {onlines.map(user => (
                    <div className='flex flex-col' key={user._id} onClick={(e) => handleConversationButton(e, user)}>
                        <img className='rounded-full w-12 h-12' src={user.picture?.url} alt="Photo de Profile" />
                        <p>{user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActiveFriends
