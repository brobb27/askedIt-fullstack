// import dependencies
const express = require('express')
const commentVoteRouter = express.Router()
const Comment = require('../models/comment')

// put request to upVote
commentVoteRouter.put('/upVote/:commentId', (req, res, next) => {
    Comment.findByIdAndUpdate(
        {_id: req.params.commentId},
        {
            $addToSet: { upVotes: req.user._id },
            $pull: { downVotes: req.user._id}
        },
        {new: true},
        (err, upVotedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(upVotedComment)
        }
    )
})

// put request to downVote
commentVoteRouter.put('/downVote/:commentId', (req, res, next) => {
    Comment.findByIdAndUpdate(
        {_id: req.params.commentId},
        {
            $addToSet: { downVotes: req.user._id },
            $pull: { upVotes: req.user._id}
        },
        {new: true},
        (err, downVotedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(downVotedComment)
        }
    )
})

// put request to remove vote from post
commentVoteRouter.put('/remove/:commentId', (req, res, next) => {
    Comment.findByIdAndUpdate(
        { _id: req.params.commentId},
        { $pull: { upVotes: req.user._id, downVotes: req.user._id}},
        { new: true },
        (err, removedVoteComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(removedVoteComment)
        }
    )
})

module.exports = commentVoteRouter