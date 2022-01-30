const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')



beforeEach(async () => {
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

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
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


		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
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


describe('When there is initially one user at db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testPass', 10)
    const user = new User({ username: 'testUser', passwordHash })

    await user.save()
  })

  test('Creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'freesi',
      name: 'Freesi Käyttäjä',
      password: 'hyshys',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()


    const newUser = {
      username: 'testUser',
      name: 'Superuser',
      password: 'salainen',
    }


    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()


    const newUser = {
      username: 'a',
      name: 'userA',
      password: 'salainen',
    }


    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

	  expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()


    const newUser = {
      name: 'userA',
      password: 'salainen',
    }


    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

	  expect(result.body.error).toContain('Path `username` is required.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()


    const newUser = {
      username: 'bbbbbb',
      name: 'userB',
      password: 'b',
    }


    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

	  expect(result.body.error).toContain('password is shorter than the minimum allowed length (3) or missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()


    const newUser = {
      username: 'bbbbbb',
      name: 'userB'
    }


    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

	  expect(result.body.error).toContain('password is shorter than the minimum allowed length (3) or missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(() => {
	mongoose.connection.close()
})
