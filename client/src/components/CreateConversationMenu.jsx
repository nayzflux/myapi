import { userState } from '@/atoms/userAtom'
import { createConversation } from '@/utils/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

const CreateConversationMenu = () => {
    const [user, setUser] = useRecoilState(userState);
    const [friendsSelected, setFriendsSelected] = useState([])
    const router = useRouter();

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
        createConversation(friendsSelected, null).then(conversation => {
            if (conversation) {
                router.push('/conversations/' + conversation._id)
            }
        })
    }

    const handleCancel = (e) => {

    }

    return (
        <div className='absolute top-20 bg-white flex flex-col space-y-3 w-full'>
            <div className='flex flex-col space-y-2'>
                {user?.friends?.map(friend => (
                    <div className='flex flex-row space-x-2' key={friend?._id}>
                        <input type='checkbox' onChange={(e) => handleSelect(handleSelect, friend?._id)} />
                        <img className='w-8 h-8 rounded-full' src={friend?.picture?.url} />
                        <p>{friend?.username}</p>
                    </div>
                ))}
            </div>
            <div className='flex flex-row space-x-4'>
                {/* <p className='text-blu-600' onClick={handleCancel}>Annuler</p> */}
                <button className='bg-blue-600 rounded-md py-1 px-3 text-white' onClick={handleCreateConv}>Créer</button>
            </div>
        </div>
    )
}

export default CreateConversationMenu
