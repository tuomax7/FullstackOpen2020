const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.password || body.password.length < 3){
    return response.status(400).json({error: `User validation failed: password is shorter than the minimum allowed length (3) or missing` })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1,  url: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.delete('/:id', async (request, response) => {

	if(!request.params.id.match(/^[0-9a-f]{24}$/i)|| !User.findById(request.params.id)){
		response.status(404).end()
	}
	else{
		await User.findByIdAndRemove(request.params.id)
		response.status(204).end()
	}	
})

module.exports = usersRouter