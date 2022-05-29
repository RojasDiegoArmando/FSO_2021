const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

const { initialUsers } = helper

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        for (let user of initialUsers) {
            const passwordHash = await bcrypt.hash(user.password, 10)
            const newUser = new User({ username: user.username, passwordHash })
            await newUser.save()
        }

    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'rastradiego',
            name: 'Rojas Diego',
            password: 'Sise2022'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper status code and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Giuliana Hoyos',
            password: 'piperos',
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

    test('auth one valid user', async () => {
        const authUser = await api
            .post('/api/login')
            .send({ username: initialUsers[0].username, password: initialUsers[0].password })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(authUser.body.username).toContain(initialUsers[0].username)
    })
})

afterAll(() => {
    mongoose.connection.close()
})