import React, { useEffect, useState } from 'react'
import { register } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const RegisterForm = () => {
	const [usernameInput, setUsername] = useState('');
	const [emailInput, setEmail] = useState('');
	const [passwordInput, setPassword] = useState('');
    const [confirmPasswordInput, setConfirmPassword] = useState('');
    const [stayLogged, setStayLogged] = useState(true);

	const [usernameError, setUsernameError] = useState('');
	const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [globalError, setGlobalError] = useState('');

    const router = useRouter();
    
    useEffect(() => {
        if (usernameError !== '' && usernameInput !== '') {
            setUsernameError('')
        }
		if (emailError !== '' && emailInput) !== '') {
			setEmailError('')
		}
        if (passwordError !== '' && passwordInput !== '') {
            setPasswordError('')
        }
    }, [usernameInput, emailInput, passwordInput, confirmPasswordInput])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting registering form");

        // Vérification
        if (usernameInput === '') {
            setUsernameError('Ce champs est obligatoire')
        }
        
        if (emailInput === '') {
			setEmailError('Ce champs est obligatoire')
		}
        
        if (passwordInput === '') {
            setPasswordError('Ce champs est obligatoire')
		}
        
        if (confirmPasswordInput === '') {
			setConfirmPasswordError('Ce champs est obligatoire')
		}

        if (usernameInput === '' || passwordInput === '') {
            return;
        }

        //Register
        register(usernameInput, emailInput, passwordInput, confirmPasswordInput)
            .then((user) => {
                if (user) {
                    console.log("Registered");
                    router.push('/conversations');
                }
            })
            .catch((code) => {
                setGlobalError('Une erreur est survenue')
            })
    }
    
    const handleUsernameInput = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }
    
	const handleEmailInput = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    
    const handleConfirmPasswordInput = (e) => {
        e.preventDefault();
        setConfirmPassword(e.target.value);
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
                <p className=''>Créer votre compte <stong className='font-bold text-blue-600 underline cursor-pointer'>WaveChat</stong></p>
            </div>

            <form className='flex flex-col text-sm space-y-4' onSubmit={handleSubmit}>
                {/* Username */}
                <div className='space-y-1'>
                    <div className='flex flex-row items-center bg-gray-200 bg-opacity-20 rounded-lg p-1 space-x-2'>
                        {/* Icon */}
                        <UserIcon className='w-8 h-8' />
                        {/* Entrée */}
                        <div className='flex flex-col'>
                            <input className='bg-transparent text-lg outline-none' type='text' placeholder="Username" value={usernameInput} onChange={handleUsernameInput} />
                        </div>
                    </div>

                    {/* Erreur */}
                    <p className='text-red-600'>{usernameError}</p>
                </div>
                
                {/* Email */}
                <div className='space-y-1'>
                    <div className='flex flex-row items-center bg-gray-200 bg-opacity-20 rounded-lg p-1 space-x-2'>
                        {/* Icon */}
                        <UserIcon className='w-8 h-8' />
                        {/* Entrée */}
                        <div className='flex flex-col'>
                            <input className='bg-transparent text-lg outline-none' type='text' placeholder="Email" value={emailInput} onChange={handleEmailInput} />
                        </div>
                    </div>

                    {/* Erreur */}
                    <p className='text-red-600'>{emailError}</p>
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
                </div>
                
                {/* Confirmer Mot de passe */}
                <div className='space-y-1'>
                    <div className='flex flex-row items-center bg-gray-200 bg-opacity-20 rounded-lg p-1 space-x-2'>
                        {/* Icon */}
                        <LockClosedIcon className='w-8 h-8' />

                        {/* Entrée */}
                        <div className='flex flex-col'>
                            {/* <label className='font-medium'>Mot de passe</label> */}
                            <input className='bg-transparent text-lg outline-none' type='password' placeholder="Confirmez le mot de passe" value={confirmPasswordInput} onChange={handleConfirmPasswordInput} />
                        </div>
                    </div>

                    {/* Erreur */}
                    <p className='text-red-600'>{confirmPasswordError}</p>
                </div>

                {/* C */}
                <div className='flex flex-row justify-end'>
                    <input type='submit' value='CRÉER LE COMPTE' className='bg-blue-600 text-white font-semibold py-1 px-3 rounded text-lg hover:shadow-lg active:scale-95 cursor-pointer ease-out transition-all duration-300' />
                </div>
            </form>

            <p className='text-red-600'>{globalError}</p>

            {/* Déjà un compte */}
            <div className=' text-center text-xs'>
                <Link className='text-blue-600' href="/account/login">Vous avez déjà un compte ?</Link>
            </div>
        </div>
    )
    
}
