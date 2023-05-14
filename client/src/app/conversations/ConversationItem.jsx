"use client";

import Link from 'next/link';
import React from 'react'

const ConversationItem = ({ _id, name, users }) => {
    return (
        <div>
            <Link href={`/conversations/${_id}`}>
                <p className='font-semibold'>{name}</p>
                <div className='flex flex-row space-x-1 text-sm text-gray-400'>
                    {users.map(user => <p key={user._id}>{user.username}</p>)}
                </div>
            </Link>
        </div>
    )
}

export default ConversationItem
