const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const { body: blog } = request
    const { userId } = request
    const user = await User.findById(userId)
    const newBlog = new Blog({
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes,
        user: user._id,
    })
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
    const id = request.params.id
    const { userId } = request
    //const { token } = request
    /*
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken) {
        return response.status(401).json({
            error: 'token is missing or invalid'
        })
    }
    */
    const blog = await Blog.findById(id)
    const blogUserId = blog.user.toString()
    console.log(blogUserId + ' user in params')
    console.log(userId + ' userId middleware')
    if (blogUserId !== userId) {
        return response.status(401).json({
            error: 'you cant delete other users blogs',
        })
    }
    await Blog.findByIdAndDelete(blog.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const body = request.body

    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(updatedBlog)
})

blogsRouter.put('/:id/comment', async (request, response) => {
    const id = request.params.id
    const body = request.body

    const blog = await Blog.findById(id)
    console.log(blog)

    blog.comments = blog.comments.concat(body.comment)
    console.log(blog)
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter
