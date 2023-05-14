'use client';

import { userState } from '@/atoms/userAtom';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

const LoginModal = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useRecoilState(userState);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.request(
            {
                url: 'http://localhost:80/api/v1/auth/login',
                method: 'POST',
                data: {
                    password,
                    login: email
                },
                withCredentials: true
            }
        ).then(res => {
            console.log("auth");
            setUser(res.data.user)
        }).catch(err => {
            console.log(err);
            setError(err.response.data.message)
        });
    }

    return (
        <div className='flex flex-col space-y-2'>
            <div className='flex flex-col'>
                <h2 className='font-bold text-xl'>CONNEXION</h2>
                <p>Connecter vous à votre compte MyChatApp</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='space-y-1 font-semibold'>
                    <div className='flex flex-col'>
                        <label>Adresse e-mail</label>
                        <input className='font-light text-sm' type='email' placeholder='name@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <hr />
                    </div>
                    <div className='flex flex-col'>
                        <label>Mot de passe</label>
                        <input className='font-light text-sm' type='password' placeholder='Taper votre mot de passe...' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <hr />
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
