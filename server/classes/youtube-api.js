const { google } = require('googleapis')
const { youtube } = google

/**
 * Youtube API Caller.
 */
class YoutubeAPI {
  /**
   * Constructor of Youtube API client.
   *
   * @param {string} key
   * @param {string} version
   * @return {YoutubeAPI}
   */
  constructor(key, version = 'v3') {
    this.api = youtube({version, auth: key})
  }

  /**
   * Call "Search:list" API.
   * https://developers.google.com/youtube/v3/docs/search/list
   *
   * @param {object} params
   * @return {Promise}
   */
  search(params) {
    params = Object.assign({part: 'id,snippet'}, params)
    return this.api.search.list(params)
  }
}

module.exports = YoutubeAPI
