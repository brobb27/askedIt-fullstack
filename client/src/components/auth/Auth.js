import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../../context/UserProvider'

export default function Auth() {
    // state handler for authform and create account/login
    const [userInput, setUserInput] = useState({username: '', password: ''})
    const [hasAccount, setHasAccount] =  useState(false)

    // needed values from context
    const { createAccount, login } = useContext(UserContext)

    // handle change for user input
    function handleChange(e) {
        const {name, value} = e.target
        setUserInput(prevInput => ({
            ...prevInput,
            [name]: value
        }))
    }

    // create account funciton
    function handleCreateAccount(e) {
        e.preventDefault()
        createAccount(userInput)
    }

    // log in function
    function handleLogin(e) {
        e.preventDefault()
        login(userInput)
    }

    // toggle has account
    function toggle() {
        setHasAccount(prevState => !prevState)
    }

    return (
        <div>
            {!hasAccount ?
            <>
                <h2>Everyone has questions, lets learn from and enjoy eachothers experiences and opinions!</h2>
                <h3>Join AskedIt today.</h3>
                <AuthForm 
                    username={userInput.username}
                    password={userInput.password}
                    handleChange={handleChange}
                    handleSubmit={handleCreateAccount}
                    hasAccount={hasAccount}
                    setHasAccount={toggle}
                />
            </> :
            <>
                <h2>Sign in to AskedIt</h2>
                <AuthForm 
                    username={userInput.username}
                    password={userInput.password}
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    hasAccount={hasAccount}
                    setHasAccount={toggle}
                />
            </>}
        </div>
    )
}