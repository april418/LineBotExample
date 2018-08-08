const { resolve } = require('path')
const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/routes.js')

const server = express()

server.use(morgan('common'))
server.use(express.static(resolve(__dirname, '../public')))
Object.keys(routes).forEach(route => {
  server.use(route, routes[route])
})

module.exports = server
