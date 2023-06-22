import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Header/Header.css'

function Header() {
  const naviagte = useNavigate()  
  return (
    <>
        <div className='navBar flex justify-between items-center shadow-lg p-[1rem]'>
            <div className="logoDiv px-10">
                <h1 className='logo text-[25px] text-blueColor'><strong>Job</strong>Search</h1>
            </div>
            <div className='menu flex gap-8 pr-10'>
                <li onClick={()=>naviagte('/')} className="menuList text-[#6f6f6f] hover:text-blueColor">Home</li>
                <li onClick={()=>naviagte('/signup')} className="menuList text-[#6f6f6f] hover:text-blueColor">Sign up</li>
                <li onClick={()=>naviagte('/signin')} className="menuList text-[#6f6f6f] hover:text-blueColor">Sign in</li>
            </div>
        </div>
    </>
  )
}

export default Header