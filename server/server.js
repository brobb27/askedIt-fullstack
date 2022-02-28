// import dependencies
const express = require('express')
const app = express()
require('dotenv').config()
const expressJwt = require('express-jwt')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

// mongoDB atlas (when it gets set up for deployment)
// MONGODB_URI = enter in .env file

// middleware
app.use(express.json()) // allows express to take json in the req.body
app.use(morgan('dev')) // nice logs to the console for server activity

// connect to db using mongoose
mongoose.connect(process.env.MONGO_URI || `mongodb://localhost:27017/askedIt-db`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
() => console.log('Connected to the Asked It DB')
)

// allows requests from the front end
app.use(cors())

// routes
app.use('/auth', require('./routes/authRouter'))
// requires a secret to access any routes that start with "api"
app.use('/api', expressJwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/post', require('./routes/postRouter'))
app.use('/api/postVote', require('./routes/postVoteRouter'))
app.use('/api/comments', require('./routes/commentRouter'))
app.use('/api/commentVote', require('./routes/commentVoteRouter'))


// Error handler -- include global error handler in all applications
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// port
const PORT = parseInt(process.env.PORT) || 7000

// server listening
app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT}`)
})