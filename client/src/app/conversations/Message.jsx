import { userState } from '@/atoms/userAtom'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

const Message = ({ _id, content, author }) => {
    const [user, setUser] = useRecoilState(userState);

    return (
        author._id.toString() === user._id.toString() ?
            <div className='flex flex-row ml-auto space-x-2'>
                <p className='px-3 py-1 rounded-full text-sm bg-blue-600 text-white'>{content}</p>
            </div>
            :
            <div className='flex flex-row space-x-2'>
                <img className='w-7 h-7 rounded-full' alt='profile picture' src={author?.picture?.url} />
                <p className='px-3 py-1 rounded-full text-sm bg-gray-200'>{content}</p>
            </div>
    )
}

export default Message
