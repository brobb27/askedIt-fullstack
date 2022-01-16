import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'
import { BsPerson, BsQuestionDiamondFill } from 'react-icons/bs'
import { RiLogoutCircleLine } from 'react-icons/ri'

export default function Navbar({logout}) {

    return (
        <div className='navContainer'>
            <Link to='/feed' className='link'><BsQuestionDiamondFill /></Link>
            <Link to='/feed' className='link' title="Home"><IoHomeOutline /></Link>
            <Link to='/profile' className='link' title="Profile"><BsPerson /></Link>
            <Link to='/' onClick={logout} className='link' title="Logout"><RiLogoutCircleLine /></Link>
        </div>
    )
}
