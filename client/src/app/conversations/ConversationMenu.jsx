'use client';

import React from 'react'
import SearchUser from '@/components/SearchUser';
import ActiveFriends from '@/components/ActiveFriends';
import ConversationList from "@/app/conversations/components/ConversationList";

const ConversationMenu = () => {
    return (
        <div className='p-3'>
            {/* Search */}
            <SearchUser />
            {/* Active friends */}
            <ActiveFriends/>
            {/* Liste conversation */}
            <ConversationList/>
        </div>
    )
}

export default ConversationMenu
