import fetch from 'node-fetch'

import config from 'infrastructure/config'
import post from 'services/post'
import u from 'services/url'

export default {
  async get(req, res, next) {
    try {
      const { _locale } = res.locals

      const url = u.build(`${ config.cms.url }/posts`, {
        client_id: config.cms.clientId,
        client_secret: config.cms.clientSecret,
        filter: `tags:[news,news_${ _locale }]+featured:true`,
        limit: 6
      })

      const response = await fetch(url)
      const { posts } = await response.json()

      res.render(`pages/lp_${ _locale }`, {
        posts: posts
          .map(post.featureImage)
          .map(post.truncated(_locale))
      })
    } catch (e) {
      next(e)
    }
  }
}
