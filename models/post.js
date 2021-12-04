const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    header: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    upVotes: {
        type: Number,
        default: 0,
        required: true
    },
    downVotes: {
        type: Number,
        default: 0,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)