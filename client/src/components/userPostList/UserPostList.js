import React from 'react'
import Post from '../post/Post'

function UserPostList({userPosts}) {
    // post components
    const userPostComponents = userPosts.map(post => <Post {...post} key={post._id} profile={true}/>)

    return (
        <div>
            {userPostComponents}
        </div>
    )
}

export default UserPostList
