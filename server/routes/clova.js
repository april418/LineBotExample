const { Router } = require('express')
const { Middleware } = require('@line/clova-cek-sdk-nodejs')
const skills = require('../skills/ext/skills.js')

const router = Router()
const clovaConfig = {
  applicationId: process.env.CLOVA_EXTENSION_ID,
}

router.post('/', Middleware(clovaConfig), ...skills)

module.exports = router
