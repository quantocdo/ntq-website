import config from 'infrastructure/config'

import app from './server'

app.listen(
  config.port,
  () => console.log(`Started at ${ config.port }`)
)

console.log(config)
