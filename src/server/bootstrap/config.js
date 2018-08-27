import config from 'infrastructure/config'

export default app => {
  app.use((req, res, next) => {
    res.locals._config = config

    next()
  })
}
