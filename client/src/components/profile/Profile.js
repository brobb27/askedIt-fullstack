import React, { useContext, useState, useEffect } from 'react'
import './Profile.css'
import { UserContext } from '../../context/UserProvider'
import Modal from '../modal/Modal'
import PostForm from '../postForm/PostForm'
import Post from '../feedPost/FeedPost'

function Profile() {
    // user context information
    const { user: { _id }, userPosts, getUserPosts } = useContext( UserContext )

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
        <div className='profileContainer'>
            <div className='profileHeader'>
                <h2>Profile</h2>
                <button onClick={toggleModal} className='askButton'>+ Ask It</button>
                <Modal open={isOpen} toggle={toggleModal}>
                    <PostForm 
                        toggleModal={toggleModal}
                        getNewPost={getUserPosts}
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
