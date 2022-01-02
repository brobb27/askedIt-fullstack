import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar({logout}) {

    return (
        <div>
            <Link to='/feed' className='link'>Home</Link>
            <Link to='/profile' className='link'>Profile</Link>
            <Link to='/' onClick={logout} className='link'>Logout</Link>
        </div>
    )
}
