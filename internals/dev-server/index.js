import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import webpackConfig from '../webpack.config.babel'

const app = express()
const port = 3101
let started = false

const compiler = webpack(webpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      ignored: /node_modules/
    },
    logLevel: 'warn'
  })
)

app.get('/alive', (req, res, next) => res.sendStatus(200))

compiler.hooks.emit.tap('done', () => {
  if (started) {
    return
  }

  app.listen(port, () => {
    started = true

    console.log(`dev-server started at ${port}`)
  })
})

