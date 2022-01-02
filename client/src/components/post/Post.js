import React from 'react'

function Post(props) {
    // destructuring props
    const {header, createdAt, body, upVotes, downVotes, profile} = props

    // convert createdAt to readable date
    const date = new Date(createdAt).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'})

    return (
        <div>
            <p>{profile ? 'posted by you' : header} on {date}</p>
            <p>{body}</p>
            <p>{upVotes}</p>
            <p>{downVotes}</p>
        </div>
    )
}

export default Post
