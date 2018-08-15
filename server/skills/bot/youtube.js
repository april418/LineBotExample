const Skill = require('../../classes/skill.js')
const YoutubeAPI = require('../../classes/youtube-api.js')

class Youtube extends Skill {
  static get PATTERN_VIDEO() {
    return /video|動画/
  }

  constructor(bot, event) {
    super(bot, event)
    this.api = new YoutubeAPI(process.env.YOUTUBE_API_KEY)
  }

  shouldBeExecuted() {
    return this.event.type === 'message' &&
      this.event.message.type === 'text' &&
      this.messageMeansVideo()
  }

  execute() {
    return this.api.search({
      q: this.event.message.text.replace(this.constructor.PATTERN_VIDEO, '')
    }).then(result => {
      if(!(result && result.items && result.items.length > 0)) return Promise.resolve()
      return this.reply(this.generateMessage(result))
    })
  }

  messageMeansVideo() {
    return this.constructor.PATTERN_VIDEO.test(this.event.message.text)
  }

  generateMessage(result) {
    return {
      type: 'flex',
      altText: 'Youtube search results',
      contents: {
        type: 'carousel',
        contents: result.items.map(item => this.generateMessageBubble(item))
      }
    }
  }

  generateMessageBubble(item) {
    return {
      type: 'flex',
      altText: item.snippet.title,
      contents: {
        type: 'bubble',
        header: this.generateMessageHeader(item),
        hero: this.generateMessageHero(item),
        body: this.generateMessageBody(item),
        footer: this.generateMessageFooter(item),
        styles: {
          header: {
            separator: true
          },
          hero: {
            separator: true
          },
          body: {
            separator: true
          },
          footer: {
            separator: true
          }
        }
      }
    }
  }

  generateMessageHeader(item) {
    return {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: item.snippet.title,
          align: 'center'
        }
      ]
    }
  }

  generateMessageHero(item) {
    return {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: item.snippet.thumbnails.high.url
        }
      ]
    }
  }

  generateMessageBody(item) {
    return {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: item.snippet.desctiption,
          size: 'sm'
        }
      ]
    }
  }

  generateMessageFooter(item) {
    return {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          style: 'primary',
          action: {
            type: 'uri',
            label: 'Play',
            uri: `https://www.youtube.com/watch?v=${item.id.videoId}`
          }
        }
      ]
    }
  }
}

module.exports = Youtube
