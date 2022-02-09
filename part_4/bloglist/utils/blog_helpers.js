const Blog = require('../models/blog')

const initialBlogs = [
    {
        author: "Diego Rojas",
        title: "Blog 1",
        url: "www.reddit.com",
        likes: 13,
    },
    {
        author: "Giuliana Hoyos",
        title: "Blog 2",
        url: "www.fullstackopen.com",
        likes: 5,
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}