"use client";

import { convState } from '@/atoms/convAtom';
import React from 'react'
import { useRecoilState } from 'recoil';

const ConversationItem = ({ _id, name, users }) => {
    const [conv, setConv] = useRecoilState(convState);

    console.log(users);

    const handleChoose = (e) => {
        e.preventDefault();
        console.log(`You choosed ${name}`);
        setConv({ _id, name, users });
    }

    return (
        <div onClick={handleChoose}>
            <p className='font-semibold'>{name}</p>
            <div className='flex flex-row space-x-1 text-sm text-gray-400'>
                {users.map(user => <p key={user._id}>{user.username}</p>)}
            </div>
        </div>
    )
}

export default ConversationItem
