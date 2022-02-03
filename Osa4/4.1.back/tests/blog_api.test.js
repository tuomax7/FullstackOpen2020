const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { request } = require('express')
const User = require('../models/user')


beforeEach(async () => {
	await User.deleteMany({})
	const user = {
		username: 'Testikäyttäjä',
		name: "Testaaja",
		password: 'hyshyshys'
	}
	await api
    .post('/api/users')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)
	

	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe('Returning http-gets:', () => {
	test('blogs are returned as json', async () => {
		await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('a blog written by a certain person is returned', async () => {
		const response = await api.get('/api/blogs')

		const titles = response.body.map(blog => blog.title)

		expect(titles).toContain('Blog B')
	})

	test('identifierfield is named as id', async () => {
		const response = await api.get('/api/blogs')

		response.body.map(blog => expect(blog.id).toBeDefined())
	})

})

describe('Posting blogs with http-posts', () => {

	test('a valid blog can be posted', async () => {

		const userToLogIn = {
			username: 'Testikäyttäjä',
			password: 'hyshyshys'
		}
		
		const loggedInUser = 
		await api
		.post('/api/login')
		.send(userToLogIn)
		.expect('Content-Type', /application\/json/)

		const newBlog = {
			title: 'Blog D',
			author: 'Person D',
			url: 'Blog/D',
			likes: 4
		}

		
		await api
		.post('/api/blogs')
		.send(newBlog)
		.set('Authorization', `bearer ${loggedInUser.body.token}`)
		.expect(200)
		.expect('Content-type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
	})

	test('when posting a new blog without a value for likes, it is initiated with 0', async () => {

		const userToLogIn = {
			username: 'Testikäyttäjä',
			password: 'hyshyshys'
		}
		
		const loggedInUser = 
		await api
		.post('/api/login')
		.send(userToLogIn)
		.expect('Content-Type', /application\/json/)

		const blogWithoutLikes = {
			title: 'NoLikesBlog',
			author: 'NoLikesAuthor',
			url: 'No/Likes'
		}

		await api
		.post('/api/blogs')
		.send(blogWithoutLikes)
		.set('Authorization', `bearer ${loggedInUser.body.token}`)
		.expect(200)
		.expect('Content-type', /application\/json/)


		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
	})

	test('when posting a new blog without a title and an url response is 400', async () => {

		const userToLogIn = {
			username: 'Testikäyttäjä',
			password: 'hyshyshys'
		}
		
		const loggedInUser = 
		await api
		.post('/api/login')
		.send(userToLogIn)
		.expect('Content-Type', /application\/json/)

		const blogWithoutStuff = {
			author: 'Author Person',
			likes: 100
		}

		await api
		.post('/api/blogs')
		.send(blogWithoutStuff)
		.set('Authorization', `bearer ${loggedInUser.body.token}`)
		.expect(400)
	})

	test('when posting a new blog without providing a token returns 401 unauthorised', async () => {

		const newBlog = {
			title: 'Blog E',
			author: 'Person E',
			url: 'Blog/E',
			likes: 4
		}

		await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(401)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})

})


describe('Editing blogs with http puts', () => {

	test('basic put request works for changing likes', async () => {

		const response = await api.get('/api/blogs')

		const toBeReplaced = response.body[0]

		const replacement = { ...toBeReplaced, likes: 50 }

		await api
		.put(`/api/blogs/${toBeReplaced.id}`)
		.send(replacement)
		.expect(200)
	})

	test('replacement has wrong datatypes for fields', async () => {
		const response = await api.get('/api/blogs')

		const toBeReplaced = response.body[1]

		const replacement = { ...toBeReplaced, likes: "Moro"}

		await api
		.put(`/api/blogs/${toBeReplaced.id}`)
		.send(replacement)
		.expect(400)
	})

	test('id of blog to be replaced is faulty', async () => {
		const response = await api.get('/api/blogs')

		const toBeReplaced = response.body[1]

		const replacement = { ...toBeReplaced, likes: 49}

		await api
		.put('/api/blogs/kukkuluuruu')
		.send(replacement)
		.expect(404)
	})

})
afterAll(() => {
	mongoose.connection.close()
})
