import React, { useState } from 'react'
import AuthForm from './AuthForm'

export default function Auth() {
    // state handler for authform and create account/login
    const [userInput, setUserInput] = useState({username: '', password: ''})
    const [hasAccount, setHasAccount] =  useState(false)

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
        console.log('account created')
    }

    // log in function
    function handleLogin(e) {
        e.preventDefault()
        console.log('logged in')
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