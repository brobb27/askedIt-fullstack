import React, { useState, useEffect } from 'react'
import './FeedPost.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai'

// create axios interceptor so that the token will be sent with every request
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function FeedPost(props) {
    // destructuring props
    const {
        header, 
        createdAt, 
        body, 
        upVotes, 
        downVotes, 
        profile,
        _id, 
        userId,
        setFeed
    } = props

    // state handlers for upVotes
    const [upVoteList, setUpVote] = useState(upVotes)
    const [downVoteList, setDownVote] = useState(downVotes)
    const [isUpVoted, setIsUpVoted] = useState(false)
    const [isDownVoted, setIsDownVoted] = useState(false)

    // set vote status
    useEffect(() => {
        upVoteList.includes(userId) ? setIsUpVoted(true) : setIsUpVoted(false)
        downVoteList.includes(userId) ? setIsDownVoted(true) : setIsDownVoted(false)
    }, [upVoteList, downVoteList, userId])

    // put request for upVotes
    function handleUpVote() {
        userAxios.put(`/api/postVote/up/${_id}`)
            .then(res => {
                setUpVote(prevList => prevList.includes(userId) ? prevList : [...prevList, userId])
                setDownVote(prevList => prevList.filter(voteId => voteId !== userId))
            })
            .catch(err => console.log(err))
    }

    // put request for downVotes
    function handleDownVote() {
        userAxios.put(`/api/postVote/down/${_id}`)
            .then(res => {
                setDownVote(prevList => prevList.includes(userId) ? prevList : [...prevList, userId])
                setUpVote(prevList => prevList.filter(voteId => voteId !== userId))
            })
            .catch(err => console.log(err))
    }

    // request to remove vote
    function handleRemoveVote() {
        userAxios.put(`/api/postVote/remove/${_id}`)
            .then(res => {
                setUpVote(prevList => prevList.filter(voteId => voteId !== userId))
                setDownVote(prevList => prevList.filter(voteId => voteId !== userId))
            })
            .catch(err => console.log(err))
    }

    // delete request post
    function handleDelete() {
        userAxios.delete(`/api/post/delete/${_id}`)
            .then(res => {
                setFeed(prevFeed => prevFeed.filter(post => post._id !== _id))
            })
            .catch(err => console.log(err))
    }

    // convert createdAt to readable date
    const date = new Date(createdAt).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'})

    return (
        <div className='postContainer'>
            <div className='votes'>
                <div>
                    <button 
                        className='upVoteButton' 
                        onClick={handleUpVote}
                        style={isUpVoted ? { color: "#1cf819" } : null}
                    >
                        <BsArrowUpCircle />
                    </button>
                    <p>{upVoteList.length}</p>
                </div>
                <div>
                    <button 
                        className='downVoteButton'
                        onClick={handleDownVote}
                        style={isDownVoted ? { color: 'red'} : null}
                    >
                        <BsArrowDownCircle />
                    </button>
                    <p>{downVoteList.length}</p>
                </div>
            </div>
            <div className='postMain'>
                <p className='postHeader'>posted by <span className='accountName'>{profile ? 'you' : header}</span> on {date}</p>
                <p className='feedPostBody'>{body}</p>
                <div className='postFooter'>
                    <Link to={`/post/${_id}`} className='commentButton'><FaRegComment /> <span id='linkDescription'>answers</span></Link>
                    <button className='removeButton' onClick={handleRemoveVote}><MdClose/><span id='linkDescription'>remove vote</span></button>
                    {profile && <button className='removeButton' onClick={handleDelete}><AiOutlineDelete/><span id='linkDescription'>delete</span></button>}
                </div>
            </div>
        </div>
    )
}

export default FeedPost
