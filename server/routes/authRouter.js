// import dependencies
const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Create Account request
authRouter.post('/createAccount', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(user) {
            res.status(403)
            return next(new Error(`We are sorry, that username is already in use.`))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({ token, user: savedUser.withoutPassword()})
        })
    })
})

// Login request
authRouter.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(!user) {
            res.status(403)
            return next(new Error('The Username or Password is incorrect'))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err) {
                res.status(403)
                return next(new Error('The username or password is incorrect.'))
            }
            if(!isMatch) {
                res.status(403)
                return next(new Error('The username or password is incorrect.'))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: user.withoutPassword()})
        })
    })
})

module.exports = authRouter