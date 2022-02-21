import React, { useState, useEffect } from 'react'
import './Comment.css'
import axios from 'axios'
import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

// create axios interceptor so that the token will be sent with every request
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function Comment(props) {
    // destructuring props
    const {
        header,
        answer, 
        createdAt, 
        upVotes, 
        downVotes, 
        _id, 
        userId,
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
        userAxios.put(`/api/commentVote/upVote/${_id}`)
            .then(res => {
                setUpVote(prevList => prevList.includes(userId) ? prevList : [...prevList, userId])
                setDownVote(prevList => prevList.filter(voteId => voteId !== userId))
            })
            .catch(err => console.log(err))
    }

    // put request for downVotes
    function handleDownVote() {
        userAxios.put(`/api/commentVote/downVote/${_id}`)
            .then(res => {
                setDownVote(prevList => prevList.includes(userId) ? prevList : [...prevList, userId])
                setUpVote(prevList => prevList.filter(voteId => voteId !== userId))
            })
            .catch(err => console.log(err))
    }

    // request to remove vote (set up route on post router) 
    function handleRemoveVote() {
        userAxios.put(`/api/commentVote/remove/${_id}`)
            .then(res => {
                setUpVote(prevList => prevList.filter(voteId => voteId !== userId))
                setDownVote(prevList => prevList.filter(voteId => voteId !== userId))
            })
            .catch(err => console.log(err))
    }

    // convert createdAt to readable date
    const date = new Date(createdAt).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'})

    return (
        <div className='commentContainer'>
            <div className='commentVotes'>
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
            <div className='commentMain'>
                <p className='commentHeader'>reply by <span className='accountName'>{header}</span> on {date}</p>
                <p className='commentBody'>{answer}</p>
                <div className='postFooter'>
                    <button className='removeButton' onClick={handleRemoveVote}><MdClose/><span id='linkDescription'>remove vote</span></button>
                </div>
            </div>
        </div>
    )
}

export default Comment
