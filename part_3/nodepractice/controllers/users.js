const bcrypt = require('bcrypt')
const user = require('../models/user')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('notes', { content: 1, date: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await User.findByIdAndRemove(id)
    response.status(204).end()
})

module.exports = usersRouter