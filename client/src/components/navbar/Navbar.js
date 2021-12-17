import React from 'react'

export default function Navbar({logout}) {

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
