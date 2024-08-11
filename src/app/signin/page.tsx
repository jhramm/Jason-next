"use client";
import React, { useState } from 'react'
import SubHeader from '../SubHeader/SubHeader'
import axios from 'axios';
import { useRouter } from "next/navigation";


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const getUser = () => {
    const payload = {
      email,
      password
    }
    axios.post('http://localhost:8080/signin', payload).then((res) => {
       console.log(res);
       localStorage.setItem('signin', true.toString());
       router.push('/');
    }).catch((e) => {
       console.log(e);
    })
  }

  return (
    <>
    <div>
        <SubHeader title="Sign In" />    
    </div>
    <div className="bg-slate-800 my-8 m-auto w-[50%] text-center border-[5px] border-[#FCC954] rounded-xl py-10 shadow-xl">
       <h2 className="text-[30px] text-[#FCC954] font-semibold">Sign In</h2>
       <br />
       <input type="text" placeholder='EMAIL: ' className="mb-[20px] w-[80%] p-[10px] rounded-md" value={email} onChange={(e) => setEmail(e.target.value)}/>
       
       <input type="password" placeholder='PASSWORD: ' className="mb-[20px] w-[80%] p-[10px] rounded-md" value={password} onChange={(e) => setPassword(e.target.value)}/>
       
       <button className="bg-[#FCC954] p-[10px] w-[80%] my-4 rounded-md" onClick={getUser}>Sign In</button>
       <div>

       <a href="/signup" className="text-[#FCC954]">Create a new account</a>
       </div>


    </div>
    </>
  )
}
