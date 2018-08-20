export default app => {
  app.use((req, res, next) => {
    res.locals.__ = key => key

    next()
  })
}
