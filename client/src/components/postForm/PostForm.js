import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserProvider'
import './PostForm.css'

export default function PostForm({toggleModal, getNewPost}) {
    // user context
    const { user: {username}, makePost } = useContext(UserContext)

    // initial post value
    const initPost = {
        header: username,
        body: ''
    }

    // state handler for post
    const [postInputs, setPostInputs] = useState(initPost)

    // handle change for inputs
    function handleChange(e) {
        const {name, value} = e.target
        setPostInputs(prevPostInfo => ({
            ...prevPostInfo,
            [name]: value
        }))
    }

    // handle submit post
    function handleSubmit(e) {
        e.preventDefault()
        makePost(postInputs)
        setPostInputs(initPost)
        toggleModal()
        getNewPost()
    }

    return (
        <div className='postFormContainer'>
            <form onSubmit={handleSubmit} className='postForm'>
                <textarea
                    placeholder={`What's your question?`}
                    type='text'
                    name='body'
                    value={postInputs.body}
                    onChange={handleChange}
                    required
                    className='postInput'
                />
                <button className='postButton'>Ask it</button>
            </form>
        </div>
    )
}
