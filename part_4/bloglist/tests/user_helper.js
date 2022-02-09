const User = require('../models/user')
const mongoose = require('mongoose')
const initialUsers = [
    {
        username: 'root',
        password: 'secret12'
    },
    {
        username: 'user1',
        password: 'asd12asd'
    }
]

const usersInDb = async () => {
    const user = await User.find({})
    return user.map(user => user.toJSON())
}

module.exports = {
    initialUsers,
    usersInDb
}