const { card } = require('mtgsdk')
const Skill = require('./skill.js')

class MomirBasic extends Skill {
  static get PATTERN_MANACOST() {
    return /マナ$|mana$/
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
      return this.reply({
        type: 'flex',
        altText: card.name,
        contents: {
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
          body: {
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
          },
          footer: {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: card.power
              },
              {
                type: 'text',
                text: '/'
              },
              {
                type: 'text',
                text: card.toughness
              }
            ]
          }
        }
      })
    })
  }

  messageMeansManaCost() {
    return this.constructor.PATTERN_MANACOST.test(this.event.message.text)
  }
}

module.exports = MomirBasic
