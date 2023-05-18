"use client"

import {useEffect, useState} from "react";
import {fetchConversationMessages, fetchConversations} from "@/utils/api";
import {socket} from "@/utils/socket";
import {formatMessageDate, getConversationDisplayName} from "@/utils/format";
import {useRecoilState} from "recoil";
import {userState} from "@/atoms/userAtom";
import Link from "next/link";

const ConversationItem = ({_id, name, users}) => {
    const [lastMessage, setLastMessage] = useState(null);
    const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
        fetchConversationMessages(_id, 1).then((messages) => {
            setLastMessage(messages[0]);
        });

        socket.on('message_create', handleLastMessage);

        return (() => {
            socket.off('message_create', handleLastMessage);
        });
    }, []);

    const handleLastMessage = (message) => {
        console.log(message);
        if (message.conversation._id === _id || message.conversation === _id) {
            setLastMessage(message);
        }
    }
    
    return(
        <Link href={`/conversations/${_id}`}>
            <div className="flex flex-row space-x-2">
                <div>
                    <img className="w-10 h-10 rounded-full" src={users.find(u => u._id.toString() !== user._id.toString())?.picture?.url} alt="Conversation Picture"/>
                </div>
                {lastMessage ?
                    <div className="flex flex-col w-5/6">
                        <p className="font-semibold">{getConversationDisplayName({_id, name, users}, user)}</p>
                        <div className="text-sm text-gray-400 flex flex-row">
                            <p className="truncate">{lastMessage.content}</p>
                            <p className="ml-2 whitespace-nowrap">{formatMessageDate(lastMessage)}</p>
                        </div>
                    </div>
                    : "Envoyer un message pour commencer la discussion"
                }
            </div>
        </Link>
    )
}

export default ConversationItem