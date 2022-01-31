const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

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