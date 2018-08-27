import fs from 'fs-extra'
import path from 'path'

import config from 'infrastructure/config'

export default app => {
  const webpackOutput = path.resolve(config._root, '../../dist/manifest.json')
  const assets = fs.readJsonSync(webpackOutput)

  // helper
  app.use((req, res, next) => {
    res.locals.__asset = file => assets[file]

    next()
  })
}
