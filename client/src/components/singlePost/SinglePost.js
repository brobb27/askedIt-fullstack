import React, { useState, useEffect } from 'react'
import './SinglePost.css'
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

function SinglePost(props) {
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
        userAxios.put(`${process.env.REACT_APP_ASKEDIT_API}/api/postVote/up/${_id}`)
            .then(res => {
                setUpVote(prevList => prevList.includes(userId) ? prevList : [...prevList, userId])
                setDownVote(prevList => prevList.filter(voteId => voteId !== userId))
            })
            .catch(err => console.log(err))
    }

    // put request for downVotes
    function handleDownVote() {
        userAxios.put(`${process.env.REACT_APP_ASKEDIT_API}/api/postVote/down/${_id}`)
            .then(res => {
                setDownVote(prevList => prevList.includes(userId) ? prevList : [...prevList, userId])
                setUpVote(prevList => prevList.filter(voteId => voteId !== userId))
            })
            .catch(err => console.log(err))
    }

    // request to remove vote (set up route on post router) 
    function handleRemoveVote() {
        userAxios.put(`${process.env.REACT_APP_ASKEDIT_API}/api/postVote/remove/${_id}`)
            .then(res => {
                setUpVote(prevList => prevList.filter(voteId => voteId !== userId))
                setDownVote(prevList => prevList.filter(voteId => voteId !== userId))
            })
            .catch(err => console.log(err))
    }

    // convert createdAt to readable date
    const date = new Date(createdAt).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'})

    return (
        <div className='singlePostContainer'>
            <div>
                <p className='postHeader'>posted by <span className='accountName'>{profile ? 'you' : header}</span> on {date}</p>
            </div>
            <div>
                <p className='postBody'>{body}</p>
            </div>
            <div className='singlePostFooter'>
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
                <div>
                    <button className='removeButton' onClick={handleRemoveVote}><MdClose/></button>
                    <p>remove vote</p>
                </div>
            </div>
        </div>
    )
}

export default SinglePost