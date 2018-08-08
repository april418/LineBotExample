const { resolve } = require('path')
const express = require('express')
const morgan = require('morgan')
const { Client, middleware } = require('@line/bot-sdk')

const lineConfig = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
}
const bot = new Client(lineConfig)
const server = express()

server.use(morgan('common'))
server.use(express.static(resolve(__dirname, '../public')))
server.get('/', (request, response, next) => {
  response.sendFile(resolve(__dirname, '../public/index.html'))
})
server.post('/webhook', middleware(lineConfig), (request, response, next) => {
  response.sendStatus(200)

  Promise.all(request.body.events.map((event) => {
    if (event.type == "message" && event.message.type == "text"){
      if (event.message.text == "こんにちは"){
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "これはこれは"
        }))
      }
    }
  })).then((response) => {
    console.log(`${response.length} event(s) processed.`)
  })
})

module.exports = server
