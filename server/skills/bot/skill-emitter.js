/**
 * Emitter of LINE BOT Skill.
 */
class SkillEmitter {
  /**
   * Constructor of this class.
   *
   * @param object bot
   * @param array skills
   */
  constructor(bot, skills = []) {
    this.bot = bot
    this.skills = skills
  }

  /**
   * Execute all skills.
   *
   * @param object event
   * @return Promise
   */
  emitAll(event) {
    return Promise.all(this.skills.map(skillClass => {
      const skill = new skillClass(this.bot, event)
      return skill.shouldBeExecuted() ? skill.execute() : Promise.resolve()
    }))
  }
}

module.exports = SkillEmitter
