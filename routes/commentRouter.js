// import dependencies
const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

// get all comments by post ID
commentRouter.get('/post/:postId', (req, res, next) => {
    Comment.find({ post: req.params.issueId })
        .populate('user')
        .exec((err, comments) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(comments)
        })
})

// make (post) a comment
commentRouter.post('/:postId', (req, res, next) => {
    req.body.user = req.user._id
    req.body.post = req.params.issueId
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        Comment.populate(
            savedComment,
            {path: 'user', select: 'username'},
            (err) => {
                if(err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(savedComment)
            }
        )
    })
})

module.exports = commentRouter