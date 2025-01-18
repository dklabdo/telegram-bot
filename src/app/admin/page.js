import React from 'react'

export default function Home() {
  return (
    <div className='w-full flex justify-center items-center h-screen' >
        <div className='w-[70%] h-[80%]  ' >
            <h1> Admin authentification  </h1>
            <input placeholder='E-mail' type='email'   />
            <input placeholder='mot de pass'  />
        </div>
    </div>
  )
}

