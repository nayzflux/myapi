'use client';

import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import ConversationMenu from './ConversationMenu';
import { userState } from '@/atoms/userAtom';
import { fetchUser } from '@/utils/api';
import { useRouter } from 'next/navigation';

const ConversationsPage = () => {
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter();

    useEffect(() => {
        console.log("user");
        fetchUser('@me').then((user) => {
            console.log(user);
            setUser(user);
        }).catch((err) => {
            // Not logged In
            if (!user) {
                router.push('/account/login');
            }
        })
    }, []);

    return (
        <ConversationMenu />
    )
}

export default ConversationsPage
