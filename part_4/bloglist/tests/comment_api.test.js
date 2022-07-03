const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const user_helper = require('./user_helper')
const { initialUsers } = user_helper
const { initialBlogs, blogsInDb } = require('../utils/blog_helpers')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    for (let user of initialUsers) {
        const passwordHash = await bcrypt.hash(user.password, 10)
        const newUser = new User({
            username: user.username,
            passwordHash,
        })
        await newUser.save()
    }

    const users = await user_helper.usersInDb()
    const user = users[0]

    const authUser = await api
        .post('/api/login')
        .send({ username: user.username, password: 'secret12' })
        .expect(200)
        .expect('Content-type', /application\/json/)

    const { token } = authUser.body

    const blogsObjects = initialBlogs.map((blog) => ({
        ...blog,
        userId: user.id,
    }))

    for (let blog of blogsObjects) {
        await api
            .post('/api/bloglist')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    }
}, 100000)

describe('Put Method', () => {
    test('comments can be added', async () => {
        const allBlogs = await blogsInDb()
        const idToUpdate = allBlogs[0].id

        await api
            .put(`/api/bloglist/${idToUpdate}/comment`)
            .send({
                comment: 'test comment 1',
            })
            .expect(200)

        await api
            .put(`/api/bloglist/${idToUpdate}/comment`)
            .send({
                comment: 'test comment 2',
            })
            .expect(200)

        const blogsAtEnd = await blogsInDb()
        expect(blogsAtEnd[0].comments).toHaveLength(2)
    }, 10000)
})

afterAll(() => {
    mongoose.connection.close()
})
