'use client';

import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import ConversationMenu from './ConversationMenu';
import { userState } from '@/atoms/userAtom';
import { fetchUser } from '@/utils/api';

const ConversationsPage = () => {
    const [user, setUser] = useRecoilState(userState)

    useEffect(() => {
        fetchUser('@me').then((user) => {
            setUser(user);
        })
    }, []);

    return (
        <ConversationMenu />
    )
}

export default ConversationsPage
