'use client';

import React, { useEffect, useState } from 'react'
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

const AuthForm = () => {
    const [modal, setModal] = useState("LOGIN");

    const toogleModal = () => {
        if (modal === "LOGIN") {
            setModal("SIGNUP")
        } else {
            setModal("LOGIN")
        }
    }

    return (
        <div>
            AuthForm
            {modal === "LOGIN" ? <LoginModal/> : <SignUpModal/>}
            <a onClick={toogleModal}>{modal === "LOGIN" ? "Vous n'avez pas encore de compte ?" : "Vous avez déjà un compte ?"}</a>
        </div>
    )
}

export default AuthForm
