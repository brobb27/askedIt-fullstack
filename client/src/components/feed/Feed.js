import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserProvider'
import Modal from '../modal/Modal'
import PostForm from '../postForm/PostForm'

export default function Feed() {
    // user info from context
    const { user: {username} } = useContext(UserContext)

    // state handlers for posts in feed
    const [feed, setFeed] = useState([])
    const [filter, setFilter] = useState('allTime')

    // state handler for modal
    const [isOpen, setIsOpen] = useState(false)

    // toggle isOpen
    function toggleModal() {
        setIsOpen(prevState => !prevState)
    }
    
    // get all posts
    function getAllPosts() {
        axios.get(`/api/post/allTime`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    // get all posts on mount
    useEffect(() => {
        getAllPosts()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div>
                <h1>{username}</h1>
                <h2>Home</h2>
                <button onClick={toggleModal}>+ Ask Question</button>
                <Modal open={isOpen} toggle={toggleModal}>
                    <h3>What's the quesiton?</h3>
                    <PostForm 
                        toggleModal={toggleModal}
                    />
                </Modal>
                <select>
                    <option value='recent'>Recent</option>
                    <option value='allTime'>All Time</option>
                </select>
            </div>
            <div>
                Feed goes here
            </div>
        </div>
    )
}