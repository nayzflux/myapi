import { userState } from '@/atoms/userAtom';
import axios from 'axios';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';

const RegisterModal = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useRecoilState(userState);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.request(
            {
                url: 'http://localhost:80/api/v1/auth/register',
                method: 'POST',
                data: {
                    password,
                    email,
                    username,
                    confirmPassword
                },
                withCredentials: true
            }
        ).then(res => {
            console.log("sign up");
            setUser(res.data.user)
        }).catch(err => {
            console.log("sign up error");
            console.log(err);
            setError(err.response.data.message)
        });
    }

    return (
        <div>
            <h2>Inscription</h2>
            <p>Créer vous un compte MyChatApp</p>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <input type='submit' className='py-2 px-4 bg-blue-500 rounded-md'></input>
                <p className='text-red-400'>{error}</p>
            </form>
        </div>
    )
}

export default RegisterModal
