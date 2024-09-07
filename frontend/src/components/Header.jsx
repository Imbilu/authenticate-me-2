import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <h1 className='font-bold'>Auth App</h1>
            <ul className='flex gap-4'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/sign-in' >Sign In</NavLink>
            </ul>
        </div>
    </div>
  )
}
