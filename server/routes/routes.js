const index = require('./index.js')
const line = require('./line.js')
const clova = require('./clova.js')

const routes = {
  '/': index,
  '/line': line,
  '/clova': clova
}

module.exports = routes
