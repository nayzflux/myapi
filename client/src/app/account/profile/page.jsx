"use client"

import { userState } from '@/atoms/userAtom'
import { fetchUser } from '@/utils/api';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

const AccountPage = () => {
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter();

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
                    <h1 className='font-bold text-xl'>Votre Profil</h1>
                    <p>
                        Voici votre profil <strong className='font-bold text-blue-600 underline'>WaveChat</strong><br />
                        Vous pouvez modifier ici votre profil à tous moment
                    </p>
                </div>
                <form className='flex flex-col text-sm space-y-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1 space-y-1'>
                        <label className='font-bold'>Nom d'utilisateur</label>
                        <input type='text' placeholder={user?.username} />
                    </div>

                    <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1 space-y-1'>
                        <label className='font-bold'>Adresse e-mail</label>
                        <input type='text' placeholder={user?.email} />
                    </div>

                    <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1 space-y-1'>
                        <label className='font-bold'>Biographie</label>
                        <input type='text' placeholder={user?.bio ? user.bio : 'Parler de vous...'} />
                    </div >

                    <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1 space-y-1'>
                        <label className='font-bold'>Note (affiché lorsque vous êtes en ligne)</label>
                        <input type='text' placeholder={user?.note ? user.note : 'Noter quelque chose...'} />
                    </div >

                    <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1 space-y-1'>
                        <label className='font-bold'>Photo de profile</label>
                        <input type='text' placeholder={user?.picture?.url ? user.picture.url : "Entrer le lien d'une photo de profil..."} />
                    </div >
                    <div className='flex flex-row'>
                        <div className='flex flex-row justify-start'>
                            <input className='text-blue-600 underline cursor-pointer' value="Annuler" />
                        </div>
                        <div className='flex flex-row justify-end'>
                            <input className='text-white bg-blue-600 py-1 px-3 font-semibold rounded text-lg hover:shadow-lg active:scale-95 cursor-pointer ease-out transition-all duration-300' type='submit' value="Enregistrer" />
                        </div>
                    </div>
                </form >
            </div>
        </div >
    )
}

export default AccountPage
