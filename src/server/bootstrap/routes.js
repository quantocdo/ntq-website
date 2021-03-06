import express from 'express'
import serialize from 'serialize-error'

import config from 'infrastructure/config'
import * as controllers from '../controllers'

export const routes = [ {
  path: '/',
  methods: {
    get: controllers.lp.get
  }
}, {
  path: '/news/:page([0-9]+)?',
  methods: {
    get: controllers.cms.fetchNews
  }
}, {
  path: '/recruitment/:page([0-9]+)?',
  methods: {
    get: controllers.cms.fetchRecruitment
  }
}, {
  path: '/p/:slug',
  methods: {
    get: controllers.cms.get
  }
}, {
  path: '/download',
  methods: {
    get: controllers.download.get
  }
// }, {
//   path: '/download/:folderId/:fileId',
//   methods: {
//     // get: dummy
//   }
}, {
  path: '/contact',
  methods: {
    get: controllers.contact.get,
    post: controllers.contact.post
  }
}, {
  path: '/domains',
  methods: {
    get: controllers.domains.get
  }
}, {
  path: '/about',
  methods: {
    get: controllers.about.get
  }
}, {
  path: '/contract-models',
  methods: {
    get: controllers.contractModels.get
  }
}, {
  path: '/research-development',
  methods: {
    get: controllers.rd.get
  }
}, {
  path: '/services',
  methods: {
    get: controllers.services.get
  }
}, {
  path: '/success-stories',
  methods: {
    get: controllers.successStories.get
  }
} ]

const notFound = (req, res, next) => {
  res.status(404).render('errors/404')
}

const error = (error, req, res, next) => {
  if (config.production) {
    return notFound(req, res, next)
  }

  res.status(500).json(serialize(error))
}

export default app => {
  // load routes
  routes.forEach(
    ({ path, methods }) => {
      Object.entries(methods).forEach(
        ([ method, handlers ]) => {
          if (!app[method]) {
            return
          }

          app[method](path, handlers)
        }
      )
    }
  )

  // handle errors
  app.use(notFound)
  app.use(error)
}
