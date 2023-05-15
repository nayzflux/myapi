import { userState } from '@/atoms/userAtom';
import { createConversation, sendFriendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

const UserResult = ({ user }) => {
    const [hasSentFriendRequest, setHasSentFriendRequest] = useState(false);
    const [hasReceivedFriendRequest, setHasReceivedFriendRequest] = useState(false);
    const [isAlreadyFriend, setIsAlreadyFriend] = useState(false);
    const router = useRouter();

    const [currentUser, setCurrentUser] = useRecoilState(userState);

    useEffect(() => {
        // Nous sommes déjà ami
        if (user.friends.includes(currentUser._id)) {
            setIsAlreadyFriend(true)
        }

        // Nous avons envoyée une demande d'ami
        if (user.friendsRequest.received.includes(currentUser._id)) {
            setHasSentFriendRequest(true)
        }

        // Nous avons reçu une demande d'ami
        if (user.friendsRequest.sent.includes(currentUser._id)) {
            setHasReceivedFriendRequest(true)
        }
    }, [])

    const handleFriendRequest = (e) => {
        e.preventDefault();
        console.log("Handle friend request");
        sendFriendRequest(user._id).then(() => {
            setHasSentFriendRequest(true);
        });
    }

    const handleFriendRequestAccept = (e) => {
        e.preventDefault();
        console.log("Handle friend request");
        sendFriendRequest(user._id).then(() => {
            setIsAlreadyFriend(true)
        });
    }

    const handleMessageButton = (e) => {
        e.preventDefault();
        console.log("Handle message button");

        createConversation([user._id], null)
            .then(conversation => {
                // Si la conv est créer
                router.push(`/conversations/${conversation._id}`)
            })
            .catch(conversation => {
                // Si la conv existe déjà
                if (conversation) {
                    router.push(`/conversations/${conversation._id}`)
                } else {
                    console.log("Error");
                }
            });
    }

    return (
        <div className='flex flex-row items-center'>
            <div className='space-x-2 flex flex-row items-center'>
                <img src={user.picture?.url} className='w-8 h-8'></img>
                <p>{user.username}</p>
            </div>
            {
                user._id.toString() === currentUser._id.toString() ? "" :
                    isAlreadyFriend ? <button onClick={handleMessageButton} className='px-2 border-black border-2  ml-auto'>Message</button> :
                        hasReceivedFriendRequest ? <button onClick={handleFriendRequestAccept} className='px-2 border-black border-2  ml-auto'>Accepter la demande d'ami</button> :
                            hasSentFriendRequest ? <button className='px-2 border-black border-2 disabled:cursor-not-allowed ml-auto' disabled>Demande d'ami envoyé</button> :
                                <button onClick={handleFriendRequest} className='px-2 border-black border-2  ml-auto'>Demander en ami</button>
            }
        </div>
    )
}

export default UserResult
