import React, { useState, useContext, useEffect } from 'react'
import './PostPage.css'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import SinglePost from '../singlePost/SinglePost'
import CommentForm from '../commentForm/CommentForm'
import Comment from '../comment/Comment'
import { UserContext } from '../../context/UserProvider'

// create axios interceptor so that the token will be sent with every request
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function PostPage() {
    // context needed
    const { user: {_id} } = useContext(UserContext)

    // use params to get postId
    const {postId} = useParams()

    // sort comments by upvotes
    function sortByUpVotes(list) {
        list.sort((b, a) => a.upVotes.length - b.upVotes.length)
    }

    // initial post values
    const initPost = {
        header: '',
        body: '',
        upVotes: [],
        downVotes: [],
        createdAt: '',
        _id: '',
        user: ''
    }

    // state handler for post
    const [post, setPost] = useState(initPost)
    // state handler for answers
    const [comments, setComments] = useState([])
    // loading status
    const [isLoading, setLoading] = useState(true)

    // get post request
    function getPost() {
        userAxios.get(`/api/post/onepost/${postId}`)
            .then(res => {
                console.log(res.data)
                setPost(res.data)
            })
            .catch(err => console.log(err))
    }

    // get comments related to post
    function getComments() {
        userAxios.get(`/api/comments/post/${postId}`)
            .then(res => {
                console.log(res)
                const commentList = res.data
                sortByUpVotes(commentList)
                setComments(commentList)
            })
            .catch(err => console.log(err))
    }

    // get request on page load
    useEffect(() => {
        getPost()
        getComments()
        setLoading(false)
        // eslint-disable-next-line
    }, [])

    // make comment function
    function makeComment(comment) {
        userAxios.post(`/api/comments/makecomment/${postId}`, comment)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    // comment components
    const commentComponents = comments.map(commentInfo => 
        <Comment 
            {...commentInfo} 
            userId={_id} 
            key={commentInfo._id}
        />
    )

    return (
        <div>
            <Link to='/feed'>Back</Link>
            <h2>Question</h2>
            { isLoading ?
            <>
                <h1>Loading...</h1>
            </>
            :
            <div>
                <SinglePost
                    {...post}
                    userId={_id}
                    profile={false}
                />
                <CommentForm 
                    postId={postId}
                    makeComment={makeComment}
                    refreshComments={getComments}
                />
                <div>
                    {comments.length === 0 ?
                    <h2>No answers yet, be the first!</h2>
                    :
                    commentComponents
                    }
                </div>
            </div>
            }
        </div>
    )
}

export default PostPage
