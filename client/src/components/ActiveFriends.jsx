import { userState } from '@/atoms/userAtom';
import { socket } from '@/utils/socket';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

const ActiveFriends = () => {
    const [onlines, setOnline] = useState([]);
    // const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
        socket.connect();

        socket.on('user_connection', addOnline);
        socket.on('user_disconnection', removeOnline);

        return (() => {
            socket.off('user_connection', addOnline);
            socket.off('user_disconnection', removeOnline);
        });
    }, []);

    const addOnline = (online) => {
        setOnline(old => old.find(u => u._id.toString() === online._id.toString()) ? old : [...old, online]);
    }

    const removeOnline = (online) => {
        setOnline(old => old.filter(o => o._id.toString() !== online._id.toString()));
    }

    return (
        <div>
            <h3>Utilisateur en ligne</h3>
            <div className='flex flex-row space-x-1 overflow-auto'>
                {onlines.map(user => (
                    <div className='flex flex-col' key={user._id}>
                        <img className='rounded-full w-12 h-12' src={user.picture?.url} alt="Photo de Profile" />
                        <p>{user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActiveFriends
