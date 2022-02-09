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
        const newUser = new User({ username: user.username, passwordHash })
        await newUser.save()
    }
    const users = await user_helper.usersInDb()
    const user = users[0]

    //const blogsObjects = initialBlogs.map(blog => new Blog(blog))
    //const blogsPromises = blogsObjects.map(blog => blog.save())
    //await Promise.all(blogsPromises)

    const authUser = await api
        .post('/api/login')
        .send({ username: user.username, password: 'secret12' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const { token } = authUser.body

    const blogsObjects = initialBlogs.map(blog => ({ ...blog, userId: user.id }))

    for (let blog of blogsObjects) {
        await api
            .post('/api/bloglist')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    }
    //const blogsPromises = blogsObjects.map(async blog => await api.post('/api/bloglist').set('Authorization', `bearer ${token}`).send(blog).expect(200))
    //await Promise.all(blogsPromises)
}, 100000)

describe('GET method', () => {
    test('blogs are returned as JSON', async () => {
        await api
            .get('/api/bloglist')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {

        const response = await api
            .get('/api/bloglist')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('verifies that the unique identifier is named id', async () => {

        const response = await api
            .get('/api/bloglist')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const idsObject = response.body.map(blog => blog.likes)
        expect(idsObject).toBeDefined()
    })
})

describe('POST method', () => {

    test('a valid blog can be added', async () => {
        const users = await user_helper.usersInDb()
        const user = users[0]

        const authUser = await api
            .post('/api/login')
            .send({ username: user.username, password: 'secret12' })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { token } = authUser.body

        const newBlog = {
            author: 'Carlos Menem',
            title: 'President',
            url: 'www.tothemoon.com.ar',
            likes: 69,
            userId: user.id
        }
        const savedBlog = await api
            .post('/api/bloglist')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

        const authors = blogsAtEnd.map(blog => blog.author)
        expect(authors).toContain('Carlos Menem')
    })

    test('likes prop is missing', async () => {
        const users = await user_helper.usersInDb()
        const user = users[0]
        const authUser = await api
            .post('/api/login')
            .send({ username: user.username, password: 'secret12' })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { token } = authUser.body
        const newBlog = {
            author: 'Palermo',
            title: 'Boca Juniors',
            url: 'www.boca.com.ar'
        }
        const { body: savedBlog } = await api
            .post('/api/bloglist')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
        expect(savedBlog.likes).toBe(0)
    })

    test('title and url props are missing', async () => {
        const users = await user_helper.usersInDb()
        const user = users[0]
        const authUser = await api
            .post('/api/login')
            .send({ username: user.username, password: 'secret12' })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { token } = authUser.body

        const newBlog = {
            url: 'www.mercadolibre.com.ar',
            likes: 10
        }

        await api
            .post('/api/bloglist')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await blogsInDb()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    }, 10000)
})

describe('DELETE Method', () => {

    test('delete one blog', async () => {
        const users = await user_helper.usersInDb()
        const user = users[0]
        const authUser = await api
            .post('/api/login')
            .send({ username: user.username, password: 'secret12' })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { token } = authUser.body
        const allBlogs = await blogsInDb()
        const blogToDelete = allBlogs[0]
        await api
            .delete(`/api/bloglist/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .send()
            .expect(204)

        const blogsAtEnd = await blogsInDb()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

        const authors = blogsAtEnd.map(blog => blog.author)
        expect(authors).not.toContain(blogToDelete.author)
    })

})

describe('PUT Method', () => {
    test('update author', async () => {
        const allBlogs = await blogsInDb()
        const idToUpdate = allBlogs[0].id
        const newBlog = {
            author: 'Cardona Edwin'
        }

        await api
            .put(`/api/bloglist/${idToUpdate}`)
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await blogsInDb()
        const authors = blogsAtEnd.map(blog => blog.author)
        expect(authors).toContain('Cardona Edwin')
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    }, 10000)
})

afterAll(() => {
    mongoose.connection.close()
})