const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
	{
		title: 'Blog A',
		author: 'Person A',
		url: 'Blog/A',
		likes: 1
	},
	{
		title: 'Blog B',
		author: 'Person B',
		url: 'Blog/B',
		likes: 2
	},
	{
		title: 'Blog C',
		author: 'Person C',
		url: 'Blog/C',
		likes: 3
	}
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'NonExistentIdBlog', author: 'Person D', url: 'Blog/D', likes: 3 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}