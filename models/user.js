const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    memberSince: {
        type: String,
        default: Date.now
    },
    Admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)