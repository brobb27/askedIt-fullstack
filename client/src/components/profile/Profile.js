import React, { useContext, useState, useEffect } from 'react'
import './Profile.css'
import { UserContext } from '../../context/UserProvider'
import Modal from '../modal/Modal'
import PostForm from '../postForm/PostForm'
import Post from '../feedPost/FeedPost'
import axios from 'axios'

// create axios interceptor so that the token will be sent with every request
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function Profile() {
    // user context information
    const { user: { _id }, setUserState } = useContext( UserContext )

    // state handler for modal
    const [isOpen, setIsOpen] = useState(false)
    // state handler for profile feed
    const [profileFeed, setProfileFeed] = useState([])

    // toggle modal
    function toggleModal() {
        setIsOpen(prevState => !prevState)
    }

    // sort feed by most recent date
    function sortByDate(postList) {
        postList.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
    }

    // get user posts
    function getUserPosts() {
        userAxios.get(`${process.env.REACT_APP_ASKEDIT_API}/api/post/myPosts`)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    userPosts: res.data
                }))
                setProfileFeed(() => {
                    const userPosts = res.data
                    sortByDate(userPosts)
                    return userPosts
                })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // gets user posts on page load
    useEffect(() => {
        getUserPosts()
        // eslint-disable-next-line
    }, [])

    // user post components
    const userPostComponents = profileFeed.map(post => <Post {...post} userId={_id} profile={true} key={post._id} setFeed={setProfileFeed}/>)

    return (
        <div className='profileContainer'>
            <div className='profileHeader'>
                <h2>Profile</h2>
                <button onClick={toggleModal} className='askButton'>+ Ask It</button>
                <Modal open={isOpen} toggle={toggleModal}>
                    <PostForm 
                        toggleModal={toggleModal}
                        setUserFeed={setProfileFeed}
                    />
                </Modal>
            </div>
            <div>
                <h3 className='profileTitle'>My questions</h3>
                <div>
                    {userPostComponents}
                </div>
            </div>
        </div>
    )
}

export default Profile
