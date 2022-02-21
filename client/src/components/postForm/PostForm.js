import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserProvider'
import './PostForm.css'
import axios from 'axios'

// create axios interceptor so that the token will be sent with every request
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function PostForm({toggleModal, setUserFeed}) {
    // user context
    const { user: {username}, setUserState } = useContext(UserContext)

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

    // makePost
    function makePost(newPost) {
        userAxios.post('/api/post', newPost)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    userPosts: [...prevState.userPosts, res.data]
                }))
                setUserFeed(prevFeed => [...prevFeed, res.data])
            })
            .catch(err => console.log(err))
    }

    // handle submit post
    function handleSubmit(e) {
        e.preventDefault()
        makePost(postInputs)
        setPostInputs(initPost)
        toggleModal()
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


export default PostForm