/**
 * Interface of LINE BOT Skill.
 *
 * Plese your skill class extends this.
 */
class Skill {
  /**
   * Constructor of this class.
   * Set LINE BOT Client and requested event.
   *
   * @param {object} bot
   * @param {object} event
   */
  constructor(bot, event) {
    this.bot = bot
    this.event = event
  }

  /**
   * Check whether this class should be executed.
   * Plese override this method.
   *
   * @return {boolean}
   */
  shouldBeExecuted() {
    return false
  }

  /**
   * Execute this skill.
   * Plese override this method.
   *
   * @return {Promise}
   */
  execute() {
    return Promise.resolve()
  }

  /**
   * Reply to user.
   *
   * @param {object} message
   * @return {Promise}
   */
  reply(message) {
    return this.bot.replyMessage(this.event.replyToken, message)
  }
}

module.exports = Skill
