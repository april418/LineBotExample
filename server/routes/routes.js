const index = require('./index.js')
const line = require('./line.js')

const routes = {
  '/': index,
  '/line': line
}

module.exports = routes
