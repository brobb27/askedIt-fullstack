import React from 'react'
import './Post.css'
import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'

function Post(props) {
    // destructuring props
    const {header, createdAt, body, upVotes, downVotes, profile, answerCount} = props

    // state handlers for upVotes

    // convert createdAt to readable date
    const date = new Date(createdAt).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'})

    return (
        <div className='postContainer'>
            <p>{profile ? 'posted by you' : header} on {date}</p>
            <p>{body}</p>
            <div>
                <span><button><BsArrowUpCircle /></button>{upVotes}</span>
                <span><button><BsArrowDownCircle /></button>{downVotes}</span>
                <span><button><FaRegCommentDots /></button>{answerCount} answers</span>
            </div>
        </div>
    )
}

export default Post
