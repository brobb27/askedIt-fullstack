import React from 'react'
import './Auth.css'

export default function AuthForm({username, password, hasAccount, setHasAccount, handleSubmit, handleChange}) {
    return (
        <div className='authForm'>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={username}
                    onChange={handleChange}
                    required
                />
                <input 
                    type='text'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={handleChange}
                    required
                />
                <button>{hasAccount ? 'Sign In' : 'Create Account'}</button>
            </form>
            <p>{hasAccount ? `Dont have an account?` : `Already have an account?`}</p>
            <p onClick={setHasAccount} className='toggleSignIn'>{hasAccount ? `Create Account` : `Sign in`}</p>
        </div>
    )
}