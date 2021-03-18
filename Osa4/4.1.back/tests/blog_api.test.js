const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
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

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(initialBlogs)
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
		expect(response.body).toHaveLength(initialBlogs.length)
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

		const newBlog = {
			title: 'Blog D',
			author: 'Person D',
			url: 'Blog/D',
			likes: 4
		}

		await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-type', /application\/json/)

		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(initialBlogs.length + 1)
	})

	test('when posting a new blog without a value for likes, it is initiated with 0', async () => {
		const blogWithoutLikes = {
			title: 'NoLikesBlog',
			author: 'NoLikesAuthor',
			url: 'No/Likes'
		}

		await api
		.post('/api/blogs')
		.send(blogWithoutLikes)
		.expect(200)
		.expect('Content-type', /application\/json/)


		const response = await api.get('/api/blogs')

		expect(response.body[initialBlogs.length].likes).toBe(0)
	})

	test('when posting a new blog without a title and an url response is 400', async () => {

		const blogWithoutStuff = {
			author: 'Author Person',
			likes: 100
		}

		await api
		.post('/api/blogs')
		.send(blogWithoutStuff)
		.expect(400)
	})

})

describe('Deleting blogs with http deletes', () => {

	test('deletion works in basic case', async () => {

		const response = await api.get('/api/blogs')

		const toBeDeleted = response.body[0]

		await api
		.delete(`/api/blogs/${toBeDeleted.id}`)
		.expect(204)
	})

	test('returns 404 if id is faulty', async () => {

		await api
		.delete('/api/blogs/kukkuluuruu')
		.expect(404)
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
