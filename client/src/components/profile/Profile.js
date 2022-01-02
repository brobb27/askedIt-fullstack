import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/UserProvider'
import UserPostList from '../userPostList/UserPostList'
import Modal from '../modal/Modal'
import PostForm from '../postForm/PostForm'

function Profile() {
    // user context information
    const { user: { username }, userPosts, getUserPosts } = useContext( UserContext )

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

    console.log(userPosts)


    return (
        <div>
            <h2>{username}</h2>
            <button onClick={toggleModal}>+ Ask Question</button>
            <Modal open={isOpen} toggle={toggleModal}>
                <PostForm 
                    toggleModal={toggleModal}
                />
            </Modal>
            <div>
                My questions
                <UserPostList userPosts={userPosts} />
            </div>
        </div>
    )
}

export default Profile
