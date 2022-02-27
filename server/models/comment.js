const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    header: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    upVotes: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    downVotes: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
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