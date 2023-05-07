import { userState } from '@/atoms/userAtom';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { io } from 'socket.io-client';

const ChatRoom = () => {
    const [self, setSelf] = useRecoilState(userState)
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [typingUsers, setTypingUsers] = useState([]);
    const [hasStartTyping, setHasStartTyping] = useState(false);
    // const [socket, setSocket] = useState(null);

    // https://www.w3schools.com/js/js_cookies.asp
    // function getCookie(cname) {
    //     let name = cname + "=";
    //     let decodedCookie = decodeURIComponent(document.cookie);
    //     let ca = decodedCookie.split(';');
    //     for (let i = 0; i < ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }

    useEffect(() => {
        axios.request(
            {
                url: 'http://localhost:80/api/v1/messages?limit=25',
                method: 'GET',
                withCredentials: true
            }
        ).then(res => {
            console.log("Message get");
            setMessages(res.data.messages);
        }).catch(err => {
            console.log("Message error");
        });

        // console.log(getCookie("jwt"));

        // const socket = io("ws://localhost:80", { auth: { jwt: getCookie("jwt") }, withCredentials: true });
        const socket = io("ws://localhost:80", { withCredentials: true });

        //The socket is a module that exports the actual socket.io socket
        const addMessage = (message) => setMessages(prevMessages => [...prevMessages, message]);

        socket.on("message_create", (message) => {
            console.log("new message incoming");
            removeTypingUser(message.author)
            addMessage(message);
            window.scrollTo(0, document.body.scrollHeight); // ne marche pas
        });

        //The socket is a module that exports the actual socket.io socket
        const addTypingUser = (user) => setTypingUsers(prevTypingUsers => {
            if (user.username === self.username) return prevTypingUsers;

            for (const u of prevTypingUsers) {
                if (u.username === user.username) {
                    return prevTypingUsers;
                }
            }
            return [...prevTypingUsers, user]
        });

        const removeTypingUser = (user) => {
            setTypingUsers((prevTypingUsers) => (
                prevTypingUsers.filter((u) => u.username !== user.username))
            );
        };

        socket.on("typing", (user) => {
            console.log(`${user.username} is typing`);
            addTypingUser(user);
            setTimeout(() => removeTypingUser(user), 10_000);
        });

        return () => {
            // turning of socket listner on unmount
            socket.off('message_create', addMessage);
            // turning of socket listner on unmount
            socket.off('typing', addTypingUser);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.request(
            {
                url: 'http://localhost:80/api/v1/messages',
                method: 'POST',
                data: {
                    content: message
                },
                withCredentials: true
            }
        ).then(res => {
            console.log("messages sent");
            setMessage('')
        }).catch(err => {
            console.log(err);
        });
    }

    const handleTyping = (e) => {
        setMessage(e.target.value);

        // send typing all 10 sec
        if (!hasStartTyping) {
            setHasStartTyping(true);

            axios.request(
                {
                    url: 'http://localhost:80/api/v1/typing',
                    method: 'POST',
                    data: {},
                    withCredentials: true
                }
            ).then(res => {
                console.log("typing sent");
            }).catch(err => {
                console.log(err);
            });

            setTimeout(() => {
                setHasStartTyping(false);
            }, 10_000)
        }
    }

    return (
        <div>
            ChatRoom
            {messages.map(m => (
                <div className='py-2 flex flex-col' key={m._id}>
                    <p>{m.author?.username || m.author}</p>
                    <p>{m.content}</p>
                </div>
            ))}
            <form className='flex flex-row' onSubmit={handleSubmit}>
                <input type='text' placeholder='Entrer un message' value={message} onChange={handleTyping} />
                <input type='submit' />
            </form>
            <div>
                <p className='animate-bounce font-bold'>{typingUsers.length >= 1 ? typingUsers.map((u, i) => i === (typingUsers.length - 1) ? u.username : u.username + ", ") + " is typing..." : ""}</p>
            </div>
        </div>
    )
}

export default ChatRoom
