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
        <div>
            <h1>Votre Profil</h1>
            <p>
                Voici votre profil <strong className='font-bold text-blue-600 underline'>WaveChat</strong><br />
                Vous pouvez été ici votre profil à tous moment
            </p>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1'>
                    <label className='text-sm'>Nom d'utilisateur</label>
                    <input className='outline-none bg-transparent placeholder:text-black' type='text' placeholder={user?.username} />
                </div>

                <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1'>
                    <label>Adresse e-mail</label>
                    <input type='text' placeholder={user?.email} />
                </div>

                <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1'>
                    <label>Biographie</label>
                    <input type='text' placeholder={user?.bio} />
                </div >

                <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1'>
                    <label>Note (affiché lorsque vous êtes en ligne)</label>
                    <input type='text' placeholder={user?.note} />
                </div >

                <div className='flex flex-col bg-gray-200 bg-opacity-20 rounded-lg p-1'>
                    <label>Photo de profile</label>
                    <input type='text' placeholder={user?.picture?.url} />
                </div >
                <div>
                    <input className='text-blue-600 underline' value="Annuler" />
                    <input className='text-white bg-blue-600 py-1 px-3 font-semibold' type='submit' value="Enregistrer" />
                </div>
            </form >
        </div >
    )
}

export default AccountPage
