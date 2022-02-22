import React from 'react'
import './Auth.css'

export default function AuthForm({username, password, confirmPass, passwordsMatch, hasAccount, setHasAccount, handleSubmit, handleSkipSignIn, handleChange, handleConfirm, err}) {
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
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={handleChange}
                    required
                />
                {!hasAccount &&
                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    value={confirmPass}
                    onChange={handleConfirm}
                    required
                />
                }
                {err && <p className='errMsg'>{err}</p>}
                {!hasAccount && !passwordsMatch ? <p className='errMsg'>The passwords do not match.</p> : <></>}
                <button>{hasAccount ? 'Sign In' : 'Create Account'}</button>
            </form>
            <p>{hasAccount ? `Dont have an account?` : `Already have an account?`}</p>
            <p onClick={setHasAccount} className='toggleSignIn'>{hasAccount ? `Create account` : `Sign in`}</p>
            {hasAccount && 
            <>
            <p>Just Visiting?</p>
            <p onClick={handleSkipSignIn} className='toggleSignIn'>Sign in as guest</p>
            </>
            }
        </div>
    )
}