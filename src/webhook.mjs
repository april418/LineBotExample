import express from 'express'
const {Router} = express
import parrot from './skill/parrot.mjs'

const webhook = Router()
webhook.post('/', (request, response, next) => {
  request.sendStatus(200)
  return next()
}, parrot)

export default webhook
