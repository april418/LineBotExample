const { Router } = require('express')
const { Client, middleware } = require('@line/bot-sdk')

const router = Router()
const lineConfig = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
}
const bot = new Client(lineConfig)

router.post('/', middleware(lineConfig), (request, response, next) => {
  response.sendStatus(200)

  Promise.all(request.body.events.map((event) => {
    if (event.type == "message" && event.message.type == "text"){
      if (event.message.text == "こんにちは"){
        return bot.replyMessage(event.replyToken, {
          type: "text",
          text: "これはこれは"
        })
      }
    }
  })).then((response) => {
    console.log(`${response.length} event(s) processed.`)
  })
})

module.exports = router
