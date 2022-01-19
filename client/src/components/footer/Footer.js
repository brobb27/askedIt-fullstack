import React, { useContext } from 'react'
import './Footer.css'
import { ImProfile } from 'react-icons/im'
import { UserContext } from '../../context/UserProvider'

function Footer() {
    // useContext for username
    const { user: {username} } = useContext(UserContext)

    return (
        <div className='footerContainer'>
            <ImProfile className='profileInfoIcon'/>
            <p>{username}</p>
        </div>
    )
}

export default Footer
