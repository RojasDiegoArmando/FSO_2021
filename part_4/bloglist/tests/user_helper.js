const User = require('../models/user')

const initialUsers = [
    {
        username: 'root',
        password: 'secret12',
        blogs: []
    },
    {
        username: 'user1',
        password: 'asd12asd',
        blogs: []
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