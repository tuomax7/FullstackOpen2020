const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {
	logger.info('Connected to MONGODB')
})
.catch((error) => {
	logger.error('Error connecting to MONGODB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter);

module.exports = app