const Skill = require('../../classes/skill.js')

class Hello extends Skill {
  constructor(bot, event) {
    super(bot, event)
  }

  shouldBeExecuted() {
    return this.event.type === 'message' &&
      this.event.message.type === 'text' &&
      this.event.message.text === 'こんにちは'
  }

  execute() {
    return this.reply({
      type: 'text',
      text: 'これはこれは'
    })
  }
}

module.exports = Hello
