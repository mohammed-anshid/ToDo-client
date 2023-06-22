/* eslint-disable jsx-a11y/anchor-is-valid */

import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const [state, setState] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () =>{
    try {
        localStorage.removeItem('userToken')
        navigate('/signin')
    } catch (error) {
        
    }
  }
  return (
    <div class='navBar flex justify-between items-center shadow-lg p-[1rem]'>
        <div class="logoDiv px-10">
            <h1 class='logo text-[25px] text-blueColor'><strong>To</strong>Do</h1>
        </div>
        <div class='menu flex gap-8 pr-10'>
            <div>
                <div>
                    <button type="button" onClick={()=>setState(!state)} class="flex max-w-xs items-center rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="https://res.cloudinary.com/dbb0ncoht/image/upload/v1687352753/man_a2sfui.png" alt=""/>
                    </button>
                </div>
                {state && 
                <div class="absolute right-0 z-10 mt-2 mr-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <a href="/profile" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                    <a onClick={handleLogout} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                </div>
                }
            </div>
        </div>
    </div>
  )
}

export default NavBar