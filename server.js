// import dependencies
const express = require('express')
const app = express()
require('dotenv').config()
const expressJwt = require('express-jwt')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

// port
const PORT = process.env.PORT || 7000

// mongoDB atlas (when it gets set up for deployment)
// MONGODB_URI = (Enter mongo URI)

// middleware
app.use(express.json()) // allows express to take json in the req.body
app.use(morgan('dev')) // nice logs to the console for server activity

// connect to db using mongoose
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/askedIt-db`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
() => console.log('Connected to the Marketplace DB')
)

// allows requests from the front end (setting proxy does this as well)
app.use(cors({
    origin: 'http://localhost:3000',
    origin: 'http://localhost:7000'
}))

// routes
app.use('/auth', require('./routes/authRouter'))
// requires a secret to access any routes that start with "api"
app.use('/api', expressJwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/post', require('./routes/postRouter'))
app.use('/api/postVote', require('./routes/postVoteRouter'))

// Error handler -- include global error handler in all applications
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// server listening
app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT}`)
})