'use client';

import Loading from '@/components/Loading';
import { fetchConversation, fetchUser } from '../../../utils/api';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Conversation from '@/app/conversations/Conversation';
import { userState } from '@/atoms/userAtom';
import { useRecoilState } from 'recoil';
import { socket } from '@/utils/socket';

const ConversationPage = ({ params }) => {
  const [conversation, setConversation] = useState(null);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    fetchUser('@me').then((user) => {
      setUser(user);
    });

    // Connect to Socket
    socket.connect();
  }, [])

  useEffect(() => {
    console.log(`Fetching conversation ${params.conversationId}...`);
    fetchConversation(params.conversationId).then((conversation) => {
      setConversation(conversation);

      if (!conversation) {
        console.log("No conversation found!");
      }
    })
  }, []);

  return (
    conversation ? <Conversation _id={conversation._id} name={conversation.name} users={conversation.users} /> : <Loading />
  )
}

export default ConversationPage;
