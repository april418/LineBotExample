const server = require('./server/server.js')
const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Server listening on ${port}`)
})

server.on('error', (error) => {
  console.log(`Error: ${error}`)
})
