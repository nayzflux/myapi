"use client"

import { userState } from '@/atoms/userAtom'
import { fetchUser } from '@/utils/api';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react'
import { useRecoilState } from 'recoil'

const AccountPage = () => {
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [note, setNote] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')

    const handleUsernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value)
    }

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }

    const handleBioChange = (e) => {
        e.preventDefault();
        setBio(e.target.value)
    }

    const handleNoteChange = (e) => {
        e.preventDefault();
        setNote(e.target.value)
    }

    const handlePictureChange = (e) => {
        e.preventDefault();
        setPictureUrl(e.target.value)
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setUsername('')
        setEmail('')
        setBio('')
        setNote('')
        setPictureUrl('')
    }

    useEffect(() => {
        fetchUser('@me').then((user) => {
            setUser(user);
        }).catch((err) => {
            // Not logged In
            if (!user) {
                router.push('/account/login');
            }
        });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit user edit");
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen w-screen'>
            <div className='flex flex-col space-y-5'>
                <div className='flex flex-col'>
                    <h1 className='font-bold text-2xl'>Votre Profil</h1>
                    <p>
                        Voici votre profil <strong className='font-bold text-blue-600 underline'>WaveChat</strong><br />
                        Vous pouvez modifier ici votre profil à tous moment
                    </p>
                </div>
                <form className='flex flex-col text-sm space-y-4' onSubmit={handleSubmit}>
                    <label type='text' className='font-bold text-xl'>Nom d'utilisateur</label>
                    <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1 space-y-1'>
                        <input className='bg-transparent text-lg outline-none' type='text' placeholder={user?.username} value={username} onChange={handleUsernameChange}/>
                    </div>

                    <label type='text' className='font-bold text-xl'>Adresse e-mail</label>                    
                    <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1 space-y-1'>
                        <input className='bg-transparent text-lg outline-none' type='text' placeholder={user?.email} value={email} onChange={handleEmailChange} />
                    </div>

                    <label type='text' className='font-bold text-xl'>Biographie</label>
                    <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1 space-y-1'>
                        <input className='bg-transparent text-lg outline-none' type='text' placeholder={user?.bio ? user.bio : 'Parler de vous...'} value={bio} onChange={handleBioChange} />
                    </div >

                    <label type='text' className='font-bold text-xl'>Note (affiché lorsque vous êtes en ligne)</label>
                    <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1 space-y-1'>
                        <input className='bg-transparent text-lg outline-none' type='text' placeholder={user?.note ? user.note : 'Noter quelque chose...'} value={note} onChange={handleNoteChange} />
                    </div >

                    <label type='text' className='font-bold text-xl'>Photo de profile</label>
                    <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1 space-y-1'>
                        <input className='bg-transparent text-lg outline-none' type='text' placeholder={user?.picture?.url ? user.picture.url : "Entrer le lien d'une photo de profil..."} value={pictureUrl} onChange={handlePictureChange} />
                    </div >

                    <div className='flex flex-col justify-between'>
                        <div className='flex justify-start'>
                            <input type="button" className='text-blue-600 text-lg underline cursor-pointer' value="Annuler" onClick={handleCancel}/>
                        </div>
                        <div className='flex justify-end'>
                            <input className='text-white bg-blue-600 py-1 px-3 font-semibold rounded text-lg hover:shadow-lg active:scale-95 cursor-pointer ease-out transition-all duration-300' type='submit' value="ENREGISTER" />
                        </div>
                    </div>
                </form >
            </div>
        </div >
    )
}

export default AccountPage
