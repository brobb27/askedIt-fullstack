import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserProvider'
import Modal from '../modal/Modal'
import PostForm from '../postForm/PostForm'
import Post from '../feedPost/FeedPost'

function Profile() {
    // user context information
    const { user: { username, _id }, userPosts, getUserPosts } = useContext( UserContext )

    // gets user posts on page load
    useEffect(() => {
        getUserPosts()
        // eslint-disable-next-line
    }, [])

    // state handler for modal
    const [isOpen, setIsOpen] = useState(false)

    // toggle modal
    function toggleModal() {
        setIsOpen(prevState => !prevState)
    }

    // user post components
    const userPostComponents = userPosts.map(post => <Post {...post} userId={_id} profile={true} key={post._id}/>)

    return (
        <div>
            <h1>{username}</h1>
            <h2>Profile</h2>
            <button onClick={toggleModal}>+ Ask Question</button>
            <Modal open={isOpen} toggle={toggleModal}>
                <PostForm 
                    toggleModal={toggleModal}
                    getNewPost={getUserPosts}
                />
            </Modal>
            <div>
                My questions
                <div>
                    {userPostComponents}
                </div>
            </div>
        </div>
    )
}

export default Profile
