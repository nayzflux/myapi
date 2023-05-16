'use client';

import React, { useEffect, useState } from 'react'
import LoginModal from './LoginModal';
import SignUpModal from './RegisterModal';
import RegisterModal from './RegisterModal';
import Link from 'next/link';

const AuthForm = ({ modal }) => {
    return (
        <div className="text-center font-mono">
            Authentification
            {modal === "LOGIN" ? <LoginModal /> : <RegisterModal />}
            {modal === "LOGIN" ? <Link href='/account/register'>Vous n'avez pas encore de compte ?</Link> : <Link href='/account/login'>Vous avez déjà un compte ?</Link>}
        </div>
    )
}

export default AuthForm
