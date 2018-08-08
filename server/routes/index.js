const { resolve } = require('path')
const express = require('express')
const router = express.Router()

router.get('/', (request, response, next) => {
  response.sendFile(resolve(__dirname, '../public/index.html'))
})

module.exports = router
