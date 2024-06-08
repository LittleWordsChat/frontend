import React from 'react'
import logo from '../assets/Logo.png'

const AuthLayouts = ({children}) => {
  return (
    <>
        <header className='flex justify-center items-center h-auto py-3 pb-3 shadow-md bg-primary'>
            <img
              class="rounded-lg"
              src={logo}
              alt='logo'
              width={400}
              height={100}
            />
        </header>

        { children }
    </>
  )
}

export default AuthLayouts