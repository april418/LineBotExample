const { card } = require('mtgsdk')
const Skill = require('./skill.js')

class MomirBasic extends Skill {
  static get PATTERN_MANACOST() {
    return /\d{1,2}\s*マナ$|\d{1,2}\s*まな|\d{1,2}\s*mana$/i
  }

  constructor(bot, event) {
    super(bot, event)
  }

  shouldBeExecuted() {
    return this.event.type === 'message' &&
      this.event.message.type === 'text' &&
      this.messageMeansManaCost()
  }

  execute() {
    return card.where({
      layout: 'normal',
      page: 1,
      pageSize: 1,
      type: 'Creature',
      cmc: parseInt(this.event.message.text),
      random: true
    }).then(cards => {
      const card = cards[0]
      if(!card) return Promise.resolve()
      return this.reply(this.generateMessage(card))
    })
  }

  messageMeansManaCost() {
    return this.constructor.PATTERN_MANACOST.test(this.event.message.text)
  }

  generateMessage(card) {
    return {
      type: 'flex',
      altText: card.name,
      contents: {
        type: 'bubble',
        header: this.generateMessageHeader(card),
        body: this.generateMessageBody(card),
        footer: this.generateMessageFooter(card)
      }
    }
  }

  generateMessageHeader(card) {
    return {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'text',
          text: card.name,
          align: 'start'
        },
        {
          type: 'text',
          text: card.manaCost,
          align: 'end'
        }
      ]
    }
  }

  generateMessageBody(card) {
    return {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: card.text,
          size: 'sm',
          wrap: true
        }
      ]
    }
  }

  generateMessageFooter(card) {
    return {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'text',
          text: card.power,
          align: 'center'
        },
        {
          type: 'text',
          text: '/',
          align: 'center'
        },
        {
          type: 'text',
          text: card.toughness,
          align: 'center'
        }
      ]
    }
  }
}

module.exports = MomirBasic
