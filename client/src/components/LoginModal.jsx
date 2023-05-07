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
        <div>
            LoginModal
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type='submit'></input>
                <p className='text-red-400'>{error}</p>
            </form>
        </div>
    )
}

export default LoginModal
