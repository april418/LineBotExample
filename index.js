const { connect, disconnect } = require('ngrok')
const opener = require('opener')
const server = require('./server/server.js')
const port = process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Server listening on ${port}`)

  if(process.env.NODE_ENV === 'development') {
    console.log('Connecting to ngrok...')

    connect({
      authtoken: process.env.NGROK_AUTHTOKEN,
      addr: port
    }).then((url) => {
      console.log(`Connect to ngrok on ${url}`)
      opener(url)
    }).catch((error) => {
      console.log(`Error: ${error}`)
    })
  }
})

server.on('error', (error) => {
  console.log(`Error: ${error}`)
})
