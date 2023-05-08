import React, { useEffect, useState } from 'react'
import Conversation from './Conversation';
import { useRecoilState } from 'recoil';
import { convState } from '@/atoms/convAtom';
import axios from 'axios';
import MessageContainer from './MessageContainer';
import ChatInput from './ChatInput';

const ConversationMenu = () => {
  const [convs, setConvs] = useState([]);
  const [conv, setConv] = useRecoilState(convState);

  // Charger les conversations
  useEffect(() => {
    axios.request(
      {
        url: 'http://localhost:80/api/v1/conversations',
        method: 'GET',
        withCredentials: true
      }
    ).then(res => {
      console.log("Conv get");
      console.log(res.data.conversations);
      setConvs(res.data.conversations);
    }).catch(err => {
      console.log("Conv error");
    });
  }, []);

  return (
    <div>
      {/* Afficher toutes les conversations */}
      {convs.map(conv => <Conversation conversation={conv} key={conv._id} />)}
      {/* Afficher la conversations actuel */}
      {conv ? 'Currently on : ' + conv.name : ''}
      {conv ? <MessageContainer /> : ''}
      {conv ? <ChatInput /> : ''}
    </div>
  )
}

export default ConversationMenu
