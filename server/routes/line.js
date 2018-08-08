const { Router } = require('express')
const { Client, middleware } = require('@line/bot-sdk')
const { card } = require('mtgsdk')

const router = Router()
const lineConfig = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
}
const bot = new Client(lineConfig)
const pattern = /マナ|mana/

router.post('/', middleware(lineConfig), (request, response, next) => {
  response.sendStatus(200)

  Promise.all(request.body.events.map((event) => {
    if(event.type == "message" && event.message.type == "text") {
      if(event.message.text == "こんにちは") {
        return bot.replyMessage(event.replyToken, {
          type: "text",
          text: "これはこれは"
        })
      }
      else if(pattern.test(event.message.text)) {
        return card.where({
          layout: 'normal',
          page: 1,
          pageSize: 1,
          type: 'Creature',
          cmc: parseInt(event.message.text),
          random: true
        }).then(cards => {
          const card = cards[0]
          if(!card) return

          return bot.replyMessage(event.replyToken, {
            type: 'bubble',
            header: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: card.name
                }
              ]
            },
            hero: {
              type: 'image',
              url: card.imageUrl,
              size: 'full'
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: card.text
                }
              ]
            }
          })
        })
      }
    }
  })).then((response) => {
    console.log(`${response.length} event(s) processed.`)
  })
})

module.exports = router
