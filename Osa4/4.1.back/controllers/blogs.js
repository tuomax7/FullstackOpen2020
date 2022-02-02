const mongoose = require('mongoose')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({...request.body, user: user._id})


  if(!blog.likes){
  	blog.likes = 0
  }

  if(!blog.title || !blog.url){

  	response.status(400).end()
  }else{

  	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
  	response.json(savedBlog.toJSON())
  }

})

blogsRouter.delete('/:id', async (request, response) => {

	if(!request.params.id.match(/^[0-9a-f]{24}$/i)|| !Blog.findById(request.params.id)){
		response.status(404).end()
	}
	else{
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	}	
})

blogsRouter.put('/:id', async (request, response) => {

	const blog = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes
	}

	if(typeof(blog.title) !== "string" || typeof(blog.author) !== "string"
		|| typeof(blog.url) !== "string" || typeof(blog.likes) !== "number"){
		
		response.status(400).end()
	}else if(!request.params.id.match(/^[0-9a-f]{24}$/i)|| !Blog.findById(request.params.id)){

		response.status(404).end()
	}else{

		const editedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		response.json(editedBlog.toJSON())
	}
})


module.exports = blogsRouter