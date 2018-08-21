import fetch from 'node-fetch'
import truncatise from 'truncatise'
import { URL } from 'url'

import config from 'infrastructure/config'

const transform = post => ({
  ...post,
  feature_image:  post.feature_image ?
    new URL(
      post.feature_image,
      config.cdn.url
    ).toString() :
    null
})

const buildUrl = (path, params) => {
  return [
    `${ config.cms.url }/ghost/api/v0.1${ path }`,
    Object.entries(params)
      .map(([ k, v ]) => `${ k }=${ encodeURIComponent(v) }`)
      .join('&')
  ].join('?')
}

export default {
  async fetchNews(req, res, next) {
    const { _locale } = res.locals

    const url = buildUrl('/posts', {
      client_id: config.cms.clientId,
      client_secret: config.cms.clientSecret,
      filter: `tags:[news,news_${ _locale }]`
    })

    const response = await fetch(url)
    const { posts } = await response.json()

    // return res.json(posts)

    res.render('pages/posts', {
      posts: posts
        .map(transform)
        .map(
          post => ({
            ...post,
            truncated: truncatise(post.html, {
              StripHTML: true,
              TruncateBy: 'words',
              TruncateLength: 30,
              Suffix: '...'
            })
          })
        )
    })
  },
  async get(req, res, next) {
    const { slug } = req.params
    const { _locale } = res.locals

    const url = buildUrl('/posts', {
      client_id: config.cms.clientId,
      client_secret: config.cms.clientSecret,
      filter: `tags:[news,news_${ _locale }]+slug:${ slug }`
    })

    try {
      const response = await fetch(url)
      const { posts } = await response.json()

      if (!posts.length) {
        throw new Error(404)
      }

      const post = posts.shift()

      res.render('pages/post', {
        post: transform(post)
      })
    } catch (e) {
      next(404)
    }
  }
}
