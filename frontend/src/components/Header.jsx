import React from 'react'
import { NavLink } from 'react-router'

function Header() {
  return (
    <div className='flex justify-between bg-amber-400 p-10'>
      <h1>Hi</h1>
      <ul className='flex gap-20'>
        <li className='hover:text-amber-900'>
            <NavLink to="/" >Home</NavLink>
        </li>
        <li className='hover:text-amber-900'>
            <NavLink to="/register" >Register</NavLink>
        </li>
        <li className='hover:text-amber-900'>
            <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Header
