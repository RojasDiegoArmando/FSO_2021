const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./user_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const { initialUsers } = helper

beforeEach(async () => {
    await User.deleteMany({})

    for (let user of initialUsers) {
        const passwordHash = await bcrypt.hash(user.password, 10)
        const newUser = new User({ username: user.username, passwordHash })
        await newUser.save()
    }
})

describe('GET method', () => {
    test('get all users', async () => {
        const { body: users } = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(users).toHaveLength(initialUsers.length)
    })

    test('get a specific user by ID', async () => {
        const usersAtStart = await helper.usersInDb()
        const userToView = usersAtStart[0]

        const { body: fetchedUser } = await api
            .get(`/api/users/${userToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(fetchedUser.username).toContain(usersAtStart[0].username)
    })
})

describe('POST method', () => {
    test('post a valid user', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'userNew',
            password: 'asd12asd'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    })

    test('try to post a user with password length < 3', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'userNot',
            password: '12'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
        expect(response.body.error).toContain('password length must be at least 3')
    })

    test('try to post a user with username length < 3', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'ut',
            password: 'asd12asd'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
        expect(response.body.error).toContain('username length must be at least 3')
    })

    test('try to post a user without username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            password: 'asd12asd'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
        expect(response.body.error).toContain('username is required')
    })

    test('try to post a user without password', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'diegorojas'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
        expect(response.body.error).toContain('password is required')
    })

    test('trying to post a duplicate username', async () => {
        const newUser = {
            username: 'root',
            password: 'asd12asd'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log(response.body.error)
        expect(response.body.error).toContain('`username` to be unique')
    })
})

afterAll(() => {
    mongoose.connection.close()
})