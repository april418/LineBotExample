const { Router } = require('express')
const { Middleware } = require('@line/clova-cek-sdk-nodejs')
const skill = require('../skills/ext/sapporo-cafe.js')

const router = Router()
const clovaConfig = {
  applicationId: process.env.CLOVA_EXTENSION_ID,
}

router.post('/', Middleware(clovaConfig), skill)

module.exports = router
