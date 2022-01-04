const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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

// pre-save hook to encrypt user passwords on create account
userSchema.pre('save', function(next) {
    const user = this
    if(!user.isModified('password')) return next()
    // bcrypt.hash has three arguments, bcrypt.hash((what you are hashing), (salt rounds), (err, hash))
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})

// method to check encrypted password on login
userSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

// remove user's password for token/sending response (need to add the function ".withoutPassword()" to auth router)
userSchema.methods.withoutPassword = function() {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('User', userSchema)