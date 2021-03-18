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

describe('Handling http-requests:', () => {
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

	afterAll(() => {
		mongoose.connection.close()
	})

})
