const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { requestLogger } = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.get('/:id', (request, response, next) => {
    const id = request.params.id
    Blog.findById(id)
        .then(blog => {
            response.json(blog)
        })
        .catch(error => {
            console.log('error')
            response.status(400).json(error.message)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog.save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter