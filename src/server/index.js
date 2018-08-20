import express from 'express'
import slash from 'express-slash'

import initRoutes from 'server/bootstrap/routes'
import initViewEngine from 'server/bootstrap/view-engine'

const app = express()

app.enable('strict routing')
app.enable('trust proxy')
app.disable('x-powered-by')

app.use(slash())

// bootstrap
initRoutes(app)
initViewEngine(app)

export default app
