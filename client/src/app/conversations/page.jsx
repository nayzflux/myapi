'use client';

import { convState } from '@/atoms/convAtom'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Conversation from './Conversation';
import ConversationMenu from './ConversationMenu';
import { userState } from '@/atoms/userAtom';
import { fetchUser } from '@/utils/api';

const ConversationsPage = () => {
    const [conv, setConv] = useRecoilState(convState);
    const [user, setUser] = useRecoilState(userState)

    useEffect(() => {
        fetchUser('@me').then((user) => {
            setUser(user);
        })
    }, []);

    return (
        conv ? <Conversation /> : <ConversationMenu />
    )
}

export default ConversationsPage
