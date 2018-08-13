const { Router } = require('express')
const { Client, middleware } = require('@line/bot-sdk')
const SkillEmitter = require('../skills/bot/skill-emitter.js')
const skills = require('../skills/bot/skills.js')

const router = Router()
const lineConfig = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
}
const bot = new Client(lineConfig)
const emitter = new SkillEmitter(bot, skills)

router.post('/', middleware(lineConfig), (request, response, next) => {
  response.sendStatus(200)

  Promise.all(request.body.events.map(event => {
    return emitter.emitAll(event)
  })).then(returns => {
    console.log(`${returns.length} event(s) processed.`)
  }).catch(errors => {
    errors.forEach(error => {
      console.log(error)
    })
  })
})

module.exports = router
