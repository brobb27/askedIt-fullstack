import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserProvider'
import Modal from '../modal/Modal'
import PostForm from '../postForm/PostForm'
import Post from '../post/Post'

// create axios interceptor so that the token will be sent with every request
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function Feed() {
    // user info from context
    const { user: {username} } = useContext(UserContext)

    // sort feed by upvotes
    function sortByUpVotes(postList) {
        postList.sort((b, a) => a.upVotes - b.upVotes)
    }

    // state handlers for posts in feed
    const [feed, setFeed] = useState([])
    // const [filter, setFilter] = useState('allTime')

    // FIGURE OUT QUERIES AND SORTS TO ALLOW THE USER TO SORT BY MOST RECENT OR MOST UPVOTES OF ALL TIME

    // state handler for modal
    const [isOpen, setIsOpen] = useState(false)

    // toggle isOpen
    function toggleModal() {
        setIsOpen(prevState => !prevState)
    }
    
    // get all posts
    function getAllPosts() {
        userAxios.get(`/api/post/allTime`)
            .then(res => {
                const postList = res.data
                sortByUpVotes(postList)
                setFeed(postList)
            })
            .then(
                sortByUpVotes(feed)
            )
            .catch(err => console.log(err))
    }
    // get all posts on mount
    useEffect(() => {
        getAllPosts()
        // eslint-disable-next-line
    }, [])

    // post components
    const postComponents = feed.map(post => <Post {...post} key={post._id} profile={false} />)

    return (
        <div>
            <div>
                <h1>{username}</h1>
                <h2>Home</h2>
                <button onClick={toggleModal}>+ Ask Question</button>
                <Modal open={isOpen} toggle={toggleModal}>
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
                {postComponents}
            </div>
        </div>
    )
}