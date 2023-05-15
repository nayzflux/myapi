import { userState } from '@/atoms/userAtom';
import { register } from '@/utils/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';

const RegisterModal = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        register(username, email, password, confirmPassword)
            .then(user => {
                console.log("Sign Up success");
                setUser(user)
                router.push('/conversations')
            }).catch(err => {
                setError('Une erreur est survenue')
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
