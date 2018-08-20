import express from 'express'
import serialize from 'serialize-error'

import lp from 'controllers/lp'

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
    get: lp.get
  }
}, {
  path: '/posts/:page([0-9])?',
  methods: {
    get: dummy
  }
}, {
  path: '/posts/:slug',
  methods: {
    get: dummy
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
    get: dummy,
    post: dummy
  }
}, {
  path: '/about',
  methods: {
    get: dummy
  }
}, {
  path: '/contract-models',
  methods: {
    get: dummy
  }
}, {
  path: '/development-domains',
  methods: {
    get: dummy
  }
}, {
  path: '/rd',
  methods: {
    get: dummy
  }
}, {
  path: '/services',
  methods: {
    get: dummy
  }
}, {
  path: '/success-stories',
  methods: {
    get: dummy
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
