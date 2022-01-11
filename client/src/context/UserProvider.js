import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

// create axios interceptor so that the token will be sent with every request
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
        userPosts: [],
        errMsg: ''
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
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    // log in
    function login(credentials) {
        axios.post('/auth/login', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            getUserPosts()
            setUserState(prevState => ({
                ...prevState,
                user: user,
                token: token
            }))
        })
        .catch(err => handleAuthError(err.response.data.errMsg))
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

    // get user posts
    function getUserPosts() {
        userAxios.get('/api/post/myPosts')
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    userPosts: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // make a post
    function makePost(newPost) {
        userAxios.post('/api/post', newPost)
            .then(res => {
                console.log(res)
                setUserState(prevState => ({
                    ...prevState,
                    userPosts: [...prevState.userPosts, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // handle any auth error
    function handleAuthError(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    // resets errMsg state
    function resetAuthError() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    return (
        <UserContext.Provider value={{
            ...userState, 
            createAccount, 
            login, 
            logout,
            makePost,
            getUserPosts,
            resetAuthError
        }}>
            { children }
        </UserContext.Provider>
    )
}