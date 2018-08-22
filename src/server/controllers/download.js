import fetch from 'node-fetch'

import config from 'infrastructure/config'
import postService from 'services/post'
import urlService from 'services/url'

export default {
  async get(req, res, next) {
    const { _locale } = res.locals

    const url = urlService.build(`${ config.cms.url }/posts/slug/download_${ _locale }`, {
      client_id: config.cms.clientId,
      client_secret: config.cms.clientSecret
    })

    try {
      const response = await fetch(url)
      const { posts } = await response.json()

      if (!posts.length) {
        throw new Error(404)
      }

      const post = posts.shift()

      res.render('pages/download', {
        content: post.html
      })
    } catch (e) {
      next(e)
    }
  }
}
