import fetch from 'node-fetch'

import config from 'infrastructure/config'
import postService from 'services/post'
import urlService from 'services/url'

export default {
  async fetchNews(req, res, next) {
    try {
      const { _locale } = res.locals
      const { page } = req.params

      if (page && parseInt(page, 10) < 2) {
        return res.redirect('/news')
      }

      const url = urlService.build(`${ config.cms.url }/posts`, {
        client_id: config.cms.clientId,
        client_secret: config.cms.clientSecret,
        filter: `tags:[news_${ _locale }]`,
        limit: 10,
        page: page || 1
      })

      const response = await fetch(url)
      const { posts, meta: { pagination } } = await response.json()

      if (pagination.page > pagination.pages) {
        return res.redirect('/news')
      }

      res.render('pages/posts', {
        prev: pagination.prev &&
          (pagination.prev < 2 ? '/news' : `/news/${ pagination.prev }`),
        next: pagination.next &&
          `/news/${ pagination.next }`,
        posts: posts
          .map(postService.featureImage)
          .map(postService.truncated(_locale))
      })
    } catch (e) {
      next(e)
    }
  },
  async fetchRecruitment(req, res, next) {
    try {
      const { _locale } = res.locals
      const { page } = req.params

      if (page && parseInt(page, 10) < 2) {
        return res.redirect('/recruitment')
      }

      const url = urlService.build(`${ config.cms.url }/posts`, {
        client_id: config.cms.clientId,
        client_secret: config.cms.clientSecret,
        filter: `tags:[recruitment_${ _locale }]`,
        limit: 6,
        page: page || 1
      })

      const response = await fetch(url)
      const { posts, meta: { pagination } } = await response.json()

      if (pagination.page > pagination.pages) {
        return res.redirect('/recruitment')
      }

      res.render('pages/posts', {
        prev: pagination.prev &&
          (pagination.prev < 2 ? '/recruitment' : `/recruitment/${ pagination.prev }`),
        next: pagination.next &&
          `/recruitment/${ pagination.next }`,
        posts: posts
          .map(postService.featureImage)
          .map(postService.truncated(_locale))
      })
    } catch (e) {
      next(e)
    }
  },
  async get(req, res, next) {
    const { slug } = req.params
    const { _locale } = res.locals

    const url = urlService.build(`${ config.cms.url }/posts`, {
      client_id: config.cms.clientId,
      client_secret: config.cms.clientSecret,
      filter: `tags:[news_${ _locale },recruitment_${ _locale }]+slug:${ slug }`
    })

    try {
      const response = await fetch(url)
      const { posts } = await response.json()

      if (!posts.length) {
        throw new Error(404)
      }

      const post = posts.shift()

      res.render('pages/post', {
        post: [ post ]
          .map(postService.featureImage)
          .map(postService.html)
          .shift()
      })
    } catch (e) {
      next(e)
    }
  }
}
