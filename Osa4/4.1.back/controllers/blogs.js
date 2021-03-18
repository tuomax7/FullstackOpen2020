const mongoose = require('mongoose')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.likes){
  	blog.likes = 0
  }

  if(!blog.title || !blog.url){

  	response.status(400).end()
  }else{

  	const savedBlog = await blog.save()
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


module.exports = blogsRouter