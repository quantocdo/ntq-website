import express from 'express'
import slash from 'express-slash'

import bootstrap from './bootstrap'

const app = express()

app.enable('strict routing')
app.enable('trust proxy')
app.disable('x-powered-by')

app.use(slash())

// bootstrap
bootstrap(app)

export default app
