import React, { useState } from 'react'
import axios from 'axios'
import { config } from 'dotenv'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider({children}) {
    // initial user state
    const initUserState = {
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || '', 
        userPosts: []
    }
    // state handler for user/token
    const [userState , setUserState] = useState(initUserState)

    // create account
    function createAccount(credentials) {
        axios.post('/auth/createAccount', credentials)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevState => ({
                    ...prevState,
                    user: user,
                    token: token
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // log in
    function login(credentials) {
        axios.post('/auth/login', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevState => ({
                ...prevState,
                user: user,
                token: token
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // log out
    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            userPosts: []
        })
    }

    // make post
    function makePost(newPost) {
        userAxios.post('/api/post', newPost)
            .then(res => console.log(res))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider value={{
            ...userState, 
            createAccount, 
            login, 
            logout,
            makePost
        }}>
            { children }
        </UserContext.Provider>
    )
}