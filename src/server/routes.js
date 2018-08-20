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
  res.status(500).end()
}

export default app => {
  // landing page
  app.get('/', dummy)

  // news
  app.get('/posts/:page([0-9])?', dummy)
  app.get('/posts/:slug', dummy)

  // files
  app.get('/download', dummy)
  app.get('/download/:folderId/:fileId', dummy)

  // contact
  app.get('/contact', dummy)
  app.post('/contact', dummy)

  // static
  app.get('/about', dummy)
  app.get('/contract-models', dummy)
  app.get('/development-domains', dummy)
  app.get('/rd', dummy)
  app.get('/services/', dummy)
  app.get('/success-stories', dummy)

  // handle errors
  app.use(notFound)
  app.use(error)
}
