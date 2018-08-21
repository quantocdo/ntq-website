import fetch from 'node-fetch'
import truncatise from 'truncatise'

import config from 'infrastructure/config'

const buildUrl = (url, params) => {
  return [
    url,
    Object.entries(params)
      .map(args => args.join('='))
      .join('&')
  ].join('?')
}

export default {
  async get(req, res, next) {
    const url = buildUrl(`${ config.cms.url }/posts`, {
      client_id: config.cms.clientId,
      client_secret: config.cms.clientSecret
    })

    const response = await fetch(url)
    const { posts } = await response.json()

    res.render('pages/posts', {
      posts: posts.map(
        post => ({
          ...post,
          truncated: truncatise(post.html, {
            StripHTML: true,
            TruncateBy: 'paragraphs',
            TruncateLength: 2,
            Suffix: ''
          })
        })
      )
    })
  },
  async single(req, res, next) {
    const { slug } = req.params

    const url = buildUrl(`${ config.cms.url }/posts`, {
      client_id: config.cms.clientId,
      client_secret: config.cms.clientSecret,
      filter: `slug:${ slug }`
    })

    const response = await fetch(url)
    const { posts } = await response.json()

    if (!posts.length) {
      return next(404)
    }

    const post = posts.shift()

    res.render('pages/post', {
      post
    })
  }
}
