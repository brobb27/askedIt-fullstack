// import dependencies
const express = require('express')
const postRouter = express.Router()
const Post = require('../models/post')

// crud requests for post

// GET requests
// get all
postRouter.get('/all', (req, res, next) => {
    Post.find((err, posts) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// get posts by user id
postRouter.get('/myPosts', (req, res, next) => {
    Post.find({ user: req.user._id }, (err, userPosts) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userPosts)
    })
})

// get by id
postRouter.get('/onePost/:postId', (req, res, next) => {
    Post.findOne({ _id: req.params.postId }, (err, postFound) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(postFound)
    })
})

// OTHER requests
// post request
postRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    const newPost = new Post(req.body)
    newPost.save((err, savedPost) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedPost)
    })
})

// delete request
postRouter.delete('/delete/:postId', (req, res, next) => {
    Post.findOneAndDelete(
        { _id: req.params.postId, user: req.user._id },
        (err, deletedPost) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedPost.body} from the database.`)
        }
    )
})

// put request
postRouter.put('/:postId', (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId, user: req.user._id }, // finds post and user id
        req.body, // updates post with new info
        {new: true}, // sends back updated post
        (err, updatedPost) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPost)
        }
    )
})

module.exports = postRouter