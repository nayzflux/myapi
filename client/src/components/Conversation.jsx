import { convState } from '@/atoms/convAtom';
import React from 'react'
import { useRecoilState } from 'recoil';

const Conversation = ({ conversation }) => {
    const [conv, setConv] = useRecoilState(convState);

    const choose = (e) => {
        e.preventDefault();
        console.log(`You choosed ${conversation.name}`);
        setConv(conversation)
    }

    return (
        <div className='py-3' onClick={choose}>
            <p>{conversation.name}</p>
            <div>
                {conversation.users.map(user => <p key={user._id}>{user.username}</p>)}
            </div>
        </div>
    )
}

export default Conversation
