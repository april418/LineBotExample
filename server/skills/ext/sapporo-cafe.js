const { Client } = require('@line/clova-cek-sdk-nodejs')

const skill = Client.configureSkill().onLaunchRequest(responseHelper => {
  responseHelper.setSimpleSpeech({
    lang: 'ja',
    type: 'PlainText',
    value: 'お店を探します。',
  })
}).onIntentRequest(async responseHelper => {
  const intent = responseHelper.getIntentName()

  console.log('Intent:' + intent)

  if(intent === 'SearchShop') {
    const slots = responseHelper.getSlots()
    console.log(slots)

    let speech = {
        lang: 'ja',
        type: 'PlainText',
        value: `まだ登録されていないエリアです。`
    }
    if(slots.area === '札幌') {
      speech.value = `${slots.area}のオススメの${slots.shop}は フジヤマドラゴンカレー です。`
    }
    else if(slots.area === '白石') {
      speech.value = `${slots.area}のオススメの${slots.shop}は 共栄堂 です。`
    }

    responseHelper.setSimpleSpeech(speech)
    responseHelper.setSimpleSpeech(speech, true)
  }
}).onSessionEndedRequest(responseHelper => {
}).handle()

module.exports = skill
