import React, { useEffect, useState } from 'react'
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { login } from '@/utils/api';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [loginInput, setLogin] = useState('');
    const [passwordInput, setPassword] = useState('');
    const [stayLogged, setStayLogged] = useState(true);

    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [globalError, setGlobalError] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (loginError !== '' && loginInput !== '') {
            setLoginError('')
        }

        if (passwordError !== '' && passwordInput !== '') {
            setPasswordError('')
        }
    }, [loginInput, passwordInput])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting logging form");

        // Vérification
        if (passwordInput === '') {
            setPasswordError('Ce champs est obligatoire')
        }

        if (loginInput === '') {
            setLoginError('Ce champs est obligatoire')
        }

        if (loginInput === '' || passwordInput === '') {
            return;
        }

        // Login
        login(loginInput, passwordInput)
            .then((user) => {
                if (user) {
                    console.log("Logged");
                    router.push('/conversations');
                }
            })
            .catch((code) => {
                // Erreur
                console.log("Login error " + code);

                if (code === 400) {
                    if (passwordInput === '') {
                        setPasswordError('Ce champs est obligatoire')
                    }

                    if (loginInput === '') {
                        setLoginError('Ce champs est obligatoire')
                    }
                }

                if (code === 403) {
                    setPasswordError('Mot de passe incorrect')
                }

                if (code === 404) {
                    setLoginError('Cet ID de connexion est introuvable')
                }

                if (!code) {
                    setGlobalError('Une erreur iconnue est survenue')
                }
            })
    }

    const handleLoginInput = (e) => {
        e.preventDefault();
        setLogin(e.target.value);
    }

    const handlePasswordInput = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleStayLoggedButton = (e) => {
        // e.preventDefault();

        if (stayLogged) {
            setStayLogged(false)
        } else {
            setStayLogged(true)
        }
    }

    return (
        <div className='flex flex-col space-y-5'>
            {/* Titre */}
            <div className='flex flex-col'>
                <h1 className='font-bold text-2xl'>AUTHENTIFICATION</h1>
                <p className=''>Connectez-vous à votre compte <stong className='font-bold text-blue-600 underline'>WaveChat</stong></p>
            </div>

            <form className='flex flex-col text-sm space-y-4' onSubmit={handleSubmit}>
                {/* Id de connexion */}
                <div className='space-y-1'>
                    <div className='flex flex-row items-center bg-gray-200 bg-opacity-20 rounded-lg p-1 space-x-2'>
                        {/* Icon */}
                        <UserIcon className='w-8 h-8' />
                        {/* Entrée */}
                        <div className='flex flex-col'>
                            {/* <label className='font-medium'>Identifiant</label> */}
                            <input className='bg-transparent text-lg outline-none' type='text' placeholder="ID de connexion" value={loginInput} onChange={handleLoginInput} />
                        </div>
                    </div>

                    {/* Erreur */}
                    <p className='text-red-600'>{loginError}</p>
                </div>

                {/* Mot de passe */}
                <div className='space-y-1'>
                    <div className='flex flex-row items-center bg-gray-200 bg-opacity-20 rounded-lg p-1 space-x-2'>
                        {/* Icon */}
                        <LockClosedIcon className='w-8 h-8' />

                        {/* Entrée */}
                        <div className='flex flex-col'>
                            {/* <label className='font-medium'>Mot de passe</label> */}
                            <input className='bg-transparent text-lg outline-none' type='password' placeholder="Mot de passe" value={passwordInput} onChange={handlePasswordInput} />
                        </div>
                    </div>
                    {/* Erreur */}
                    <p className='text-red-600'>{passwordError}</p>

                    {/* Password reset */}
                    <div className=' text-right text-xs'>
                        <Link className='text-blue-600' href="/account/forgot-password">Mot de passe oublié ?</Link>
                    </div>
                </div>

                {/* Rester connecté */}
                <div className='flex flex-row justify-center space-x-3'>
                    <input type='checkbox' className='cursor-pointer' onChange={handleStayLoggedButton} checked={stayLogged} />
                    <label className='font-medium'>Rester connecté</label>
                </div>

                {/* Rester connecté */}
                <div className='flex flex-row justify-end'>
                    <input type='submit' value='SE CONNECTER' className='bg-blue-600 text-white font-semibold py-1 px-3 rounded text-lg hover:shadow-lg active:scale-95 cursor-pointer ease-out transition-all duration-300' />
                </div>
            </form>

            <p className='text-red-600'>{globalError}</p>

            {/* Pas de compte */}
            <div className=' text-center text-xs'>
                <Link className='text-blue-600' href="/account/register">Vous n'avez pas encore de compte ?</Link>
            </div>
        </div>
    )
}

export default LoginForm
