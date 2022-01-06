import React, { useState, useEffect } from 'react'
import './Post.css'
import axios from 'axios'
import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'

// create axios interceptor so that the token will be sent with every request
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function Post(props) {
    // destructuring props
    const {header, createdAt, body, upVotes, downVotes, profile, answerCount, _id, userId} = props

    // state handlers for upVotes
    const [upVoteList, setUpVote] = useState(upVotes)
    const [downVoteList, setDownVote] = useState(downVotes)
    const [isUpVoted, setUpVoted] = useState(false)
    const [isDownVoted, setDownVoted] = useState(false)

    // set vote status
    useEffect(() => {
        upVoteList.includes(userId) ? setUpVoted(true) : setUpVoted(false)
        downVoteList.includes(userId) ? setDownVoted(true) : setDownVoted(false)
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

        // YOU ARE HERE
    // request to remove vote (set up route on post router) 

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
            <div className='main'>
                <p className='header'>posted by <span className='accountName'>{profile ? 'you' : header}</span> on {date}</p>
                <p>{body}</p>
                <div className='answers'>
                    <button className='commentButton'><FaRegComment /></button>
                    <p>{answerCount} answers</p>
                </div>
            </div>
        </div>
    )
}

export default Post
