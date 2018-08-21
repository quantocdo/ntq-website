import truncatise from 'truncatise'
import { URL } from 'url'

import config from 'infrastructure/config'

export default {
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
