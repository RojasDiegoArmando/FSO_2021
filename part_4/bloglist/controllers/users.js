const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { url: 1, author: 1, title: 1 })
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const user = await User.findById(id)
    response.json(user)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.username) response.status(400).send({ error: 'username is required' })
    if (!body.password) response.status(400).send({ error: 'password is required' })
    if (body.password.length < 3) response.status(400).send({ error: 'password length must be at least 3' })
    if (body.username.length < 3) response.status(400).send({ error: 'username length must be at least 3' })

    const passwordHash = await bcrypt.hash(body.password, 10)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter