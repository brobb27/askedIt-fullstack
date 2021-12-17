import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserProvider'

export default function Feed() {
    // user info from context
    const { user: {username} } = useContext(UserContext)

    // list of posts
    const [feed, setFeed] = useState([])
    const [filter, setFilter] = useState('allTime')
    
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