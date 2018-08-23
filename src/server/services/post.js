import cheerio from 'cheerio'
import truncatise from 'truncatise'
import { URL } from 'url'

import config from 'infrastructure/config'

export default {
  html(post) {
    const dom = cheerio.load(post.html)

    dom('img').each(function() {
      const img = dom(this)
      const src = img.attr('src')

      img.attr(
        'src',
        (src && src.indexOf('/') === 0) ?
          `${ config.cdn.url }${ src }` :
          src
      )
    })

    return {
      ...post,
      html: dom.html()
    }
  },
  featureImage(post) {
    const src = (post.feature_image && post.feature_image.indexOf('/') === 0) ?
        `${ config.cdn.url }${ post.feature_image }` :
        post.feature_image

    return {
      ...post,
      feature_image: src
    }
  },
  truncated(locale) {
    return (post) => ({
      ...post,
      truncated: truncatise(post.html, {
        StripHTML: true,
        TruncateBy: locale === 'ja' ? 'characters' : 'words',
        TruncateLength: locale === 'ja' ? 100 : 30,
        Suffix: '...'
      })
    })
  }
}
