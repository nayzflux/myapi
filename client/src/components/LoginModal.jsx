'use client';

import { userState } from '@/atoms/userAtom';
import { login } from '@/utils/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

const LoginModal = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();

        login(email, password).then(user => {
            console.log("Sign In success");
            setUser(user)
            router.push('/conversations')
        }).catch(err => {
            setError('Une erreur est survenue')
        });
    }

    return (
        <div className='flex flex-col space-y-2'>
            <div className='flex flex-col'>
                <h2 className='font-bold text-xl text-center'>CONNEXION</h2>
                <p className='text-center'>Connecter vous à votre compte MyChatApp</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='space-y-1 font-semibold'>
                    <div className='flex flex-col items-center'>
                        <label>Adresse e-mail</label>
                        <input className='font-light text-sm bg-slate-200' type='email' placeholder='name@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col items-center'>
                        <label>Mot de passe</label>
                        <input className='font-light text-sm bg-slate-200' type='password' placeholder='Taper votre mot de passe...' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <input type='submit' value='Connexion' className='bg-blue-700 rounded-lg py-1 px-3 w-28 text-white font-semibold mt-3' />
                </div>
            </form>
            <p className='text-red-400 font-semibold text-lg'>{error}</p>
        </div>
    )
}

export default LoginModal
