import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Feed() {
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
                <h1>Home</h1>
                <select>
                    <option value='recent'>Recent</option>
                    <option value='allTime'>All Time</option>
                </select>
            </div>
            <div>
                Posts go here
            </div>
        </div>
    )
}