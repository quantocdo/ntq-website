import express from 'express'
import serialize from 'serialize-error'

import * as controllers from '../controllers'

const dummy = (req, res, next) => {
  res.json({
    url: req.url,
    params: req.params,
    query: req.query
  })
}

const notFound = (req, res, next) => {
  res.set('content-type', 'text/plain')
  res.status(404).send('not found')
}

const error = (error, req, res, next) => {
  res.status(500).json(serialize(error))
}

export const routes = [ {
  path: '/',
  methods: {
    get: controllers.lp.get
  }
}, {
  path: '/news/:page([0-9])?',
  methods: {
    get: controllers.cms.fetchNews
  }
}, {
  path: '/p/:slug',
  methods: {
    get: [ controllers.cms.get, dummy ]
  }
}, {
  path: '/download',
  methods: {
    get: dummy
  }
}, {
  path: '/download/:folderId/:fileId',
  methods: {
    get: dummy
  }
}, {
  path: '/contact',
  methods: {
    get: controllers.contact.get,
    post: dummy
  }
}, {
  path: '/domains',
  methods: {
    get: controllers.domains.get,
    post: dummy
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
  path: '/development-domains',
  methods: {
    get: dummy
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
