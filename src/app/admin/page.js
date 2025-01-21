"use client"
import React from 'react'
import { auth } from '../../../lib/firebaseClient';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Home() {

  const router = useRouter()
  async function Authentification (e) {
    e.preventDefault()
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    try {
      await signInWithEmailAndPassword(auth, e.target[0].value, e.target[1].value);
      router.push("/dashboard"); // Redirect to dashboard after sign-in
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
    
  }
  return (
    <div className='w-full flex justify-center items-center h-screen' >
        <form onSubmit={(e) => Authentification(e)} className='w-[70%] bg-black/30 rounded-2xl flex flex-col items-center justify-center gap-8 h-[60%]  ' >
            <h1 className='text-2xl text-white' > Admin authentification  </h1>
            <input className='w-[70%] ' placeholder='E-mail' type='email'   />
            <input className='w-[70%] ' placeholder='mot de pass' type='password'  />
            <button className='bg-main text-white rounded-lg w-[70%] py-3 ' > Log-in </button>
        </form>
    </div>
  )
}

