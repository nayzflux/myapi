import { userState } from '@/atoms/userAtom'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

const CreateConversationMenu = () => {
    const [user, setUser] = useRecoilState(userState);
    const [friendsSelected, setFriendsSelected] = useState([])

    useEffect(() => {
        console.log(friendsSelected);
    }, [friendsSelected])

    const handleSelect = (e, friendId) => {
        setFriendsSelected(old => {
            // Si il est déjà alors l'enlevé
            if (old.includes(friendId)) {
                return old.filter(fId => fId !== friendId);
            }

            // Sinon l'ajouté
            return [...old, friendId]
        })
    }

    const handleCreateConv = (e) => {

    }

    return (
        <div className='absolute top-20 bg-white'>
            {user?.friends?.map(friend => (
                <div className='flex flex-row' key={friend?._id}>
                    <input type='checkbox' onChange={(e) => handleSelect(handleSelect, friend?._id)} />
                    <img className='w-8 h-8' src={friend?.picture?.url} />
                    <p>{friend?.username}</p>
                </div>
            ))}
            <button onClick={handleCreateConv}></button>
        </div>
    )
}

export default CreateConversationMenu
