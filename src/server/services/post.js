import cheerio from 'cheerio'
import truncatise from 'truncatise'
import { URL } from 'url'

import config from 'infrastructure/config'

export default {
  html(post) {
    const dom = cheerio.load(post.html)

    dom('img').each(function() {
      const img = dom(this)

      img.attr(
        'src',
        new URL(
          img.attr('src'),
          config.cdn.url
        ).toString()
      )
    })

    return {
      ...post,
      html: dom.html()
    }
  },
  featureImage(post) {
    return {
      ...post,
      feature_image: post.feature_image ?
        new URL(
          post.feature_image,
          config.cdn.url
        ).toString() :
        null
    }
  },
  truncated(post) {
    return {
      ...post,
      truncated: truncatise(post.html, {
        StripHTML: true,
        TruncateBy: 'words',
        TruncateLength: 30,
        Suffix: '...'
      })
    }
  }
}
