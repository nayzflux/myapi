import dayjs from 'dayjs'
import React from 'react'

const Message = ({ author, content, created_at }) => {
    return (
        <div className='flex flex-row space-x-2'>
            <img className='w-12 h-12 rounded-full' src={author.picture?.url} alt='Photo de profil' />
            <div className='flex flex-col flex-grow'>
                <div className='flex flex-row items-end'>
                    <p className='font-semibold hover:underline cursor-pointer'>
                        {/* Nom d'utilisateur */}
                        {author.username}
                    </p>
                    <p className='font-light ml-auto text-xs cursor-default'>
                        {/* Date */}
                        {dayjs(created_at).format('DD/MM/YYYY hh:mm')}
                    </p>
                </div>
                <p className='font-regular'>
                    {/* Contenu du message */}
                    {content}
                </p>
            </div>
        </div>
    )
}

export default Message
