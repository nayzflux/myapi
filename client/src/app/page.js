'use client';

import { userState } from "@/atoms/userAtom"
import AuthForm from "@/components/AuthForm";
import ChatRoom from "@/components/ChatRoom";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil"

export default function Home() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    axios.request(
      {
        url: 'http://localhost:80/api/v1/users/@me',
        method: 'GET',
        withCredentials: true
      }
    ).then(res => {
      console.log("Logged");
      setUser(res.data.user)
      console.log(res.data.user);
    }).then(err => {
      console.log("Not logged");
    })
  }, []);

  return (
    <div>
      {!user ? <AuthForm /> : <ChatRoom />}
    </div>
  )
}
