const http = require('http')
const app = require('./app')
const config = require('./utils/config')

console.log('creating server')
const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log('server created on port ', config.PORT)
})
