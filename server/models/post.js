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
    // upVotes and downVotes are arrays that will add the user id
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
    postAnswers: {
        type: Array,
        default: [],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)