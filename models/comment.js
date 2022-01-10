const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    header: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    upVote: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    downVote: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)