import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../../context/UserProvider'
import { BsQuestionDiamondFill } from 'react-icons/bs'

export default function Auth() {
    // initial values for username and password
    const initUser = {username: '', password: ''}

    // state handler for authform and create account/login
    const [userInput, setUserInput] = useState(initUser)
    const [hasAccount, setHasAccount] =  useState(true)

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

    // logo styles
    const fullLogoIcon = {
        color: "#1cf819",
        height: '70%'
    }

    // header styles
    const headerIcon = {
        color: "#1cf819",
        height: "4rem"
    }

    return (
        <div className={!hasAccount ? 'createAccountContainer' : 'signInContainer'}>
            <h1><BsQuestionDiamondFill style={headerIcon} /></h1>
            {!hasAccount ?
            <>
                <h3>Everyone has questions, it's time you asked yours.</h3>
                <h2>Join AskedIt<BsQuestionDiamondFill style= {fullLogoIcon}/> today!</h2>
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
            <h2>Sign in to AskedIt<BsQuestionDiamondFill style= {fullLogoIcon}/></h2>
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