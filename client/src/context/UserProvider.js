import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

export default function UserProvider({children}) {
    // state handler for user/token
    const [userState , setUserState] = useState( 
        {
            user: {}, 
            token: '', 
            posts: []
        } 
    )

    // create account
    function createAccount(credentials) {
        axios.post('/auth/createAccount', credentials)
            .then(res => console.log(res))
            .catch(err => console.log(err.response.data.errMsg))
    }

    // log in
    function login(credentials) {
        axios.post('/auth/login', credentials)
        .then(res => console.log(res))
        .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider value={{...userState, createAccount, login}}>
            { children }
        </UserContext.Provider>
    )
}