// import dependencies
const express = require("express")
const postVoteRouter = express.Router()
const Post = require('../models/post')

// put request to up vote
postVoteRouter.put('/up/:postId', (req, res, next) => {
    Post.findByIdAndUpdate(
        { _id: req.params.postId },
        { 
            $addToSet: { upVotes: req.user._id },
            $pull: { downVotes: req.user._id }
        },
        { new: true },
        (err, upVotedPost) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(upVotedPost)
        }
    )
})

// put request to down vote
postVoteRouter.put('/down/:postId', (req, res, next) => {
    Post.findByIdAndUpdate(
        { _id: req.params.postId },
        { 
            $addToSet: { downVotes: req.user._id },
            $pull: { upVotes: req.user._id }
        },
        { new: true },
        (err, downVotedPost) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(downVotedPost)
        }
    )
})

// put request to remove vote from post
postVoteRouter.put('/remove/:postId', (req, res, next) => {
    Post.findByIdAndUpdate(
        { _id: req.params.postId},
        { $pull: { upVotes: req.user._id, downVotes: req.user._id}},
        { new: true },
        (err, removedPost) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(removedPost)
        }
    )
})

module.exports = postVoteRouter