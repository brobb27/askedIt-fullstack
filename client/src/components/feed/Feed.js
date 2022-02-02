import React, { useState, useEffect, useContext } from 'react'
import './Feed.css'
import axios from 'axios'
import { UserContext } from '../../context/UserProvider'
import Modal from '../modal/Modal'
import PostForm from '../postForm/PostForm'
import FeedPost from '../feedPost/FeedPost'

// create axios interceptor so that the token will be sent with every request
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function Feed() {
    // user info from context
    const { user: { _id } } = useContext(UserContext)

    // sort feed by upvotes
    function sortByUpVotes(postList) {
        postList.sort((b, a) => a.upVotes.length - b.upVotes.length)
    }
    
    // sort feed by most recent date
    function sortByDate(postList) {
        postList.sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
    }

    // state handlers for posts in feed
    const [feed, setFeed] = useState([])
    //state for loading sort
    const [isSorting, setIsSorting] = useState(false)
    // state handler for modal
    const [isOpen, setIsOpen] = useState(false)

    // filters the feed... is there a better way? maybe async await?
    function handleFilter(e) {
        setIsSorting(true)
        const { value } = e.target
        if (value === 'recent') {
            userAxios.get('/api/post/all')
                .then(res => {
                    const postList = res.data
                    sortByDate(postList)
                    setFeed(postList)
                })
                .catch(err => console.log(err))
        } else {
            getAllPosts()
        }
        setIsSorting(false)
    }

    // toggle isOpen
    function toggleModal() {
        setIsOpen(prevState => !prevState)
    }
    
    // get all posts
    function getAllPosts() {
        userAxios.get(`/api/post/all`)
            .then(res => {
                const postList = res.data
                sortByUpVotes(postList)
                setFeed(postList)
            })
            .catch(err => console.log(err))
    }
    // get all posts on mount
    useEffect(() => {
        getAllPosts()
        // eslint-disable-next-line
    }, [])

    // post components
    const postComponents = feed.map(post => 
        <FeedPost 
            {...post} 
            userId={_id} 
            profile={false}
            key={post._id} 
        />
    )

    return (
        <div className='feedContainer'>
            <div className='feedNavbar'>
                <h2>Home</h2>
                <button onClick={toggleModal} className='askButton'>+ Ask It</button>
                <Modal open={isOpen} toggle={toggleModal}>
                    <PostForm 
                        toggleModal={toggleModal}
                        getNewPost={getAllPosts}
                    />
                </Modal>
                <select className='sortButton' onChange={handleFilter}>
                    <option value='votes'>Up Votes</option>
                    <option value='recent'>Recent</option>
                </select>
            </div>
            {isSorting ? 
            <div>
                <h2>Sorting</h2>
            </div>
            :
            <div className='feed'>
                {postComponents}
            </div>
            }
        </div>
    )
}