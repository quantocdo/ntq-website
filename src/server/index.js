import express from 'express'
import slash from 'express-slash'

import initRoutes from './routes'

const app = express()

app.enable('strict routing')
app.enable('trust proxy')
app.disable('x-powered-by')

app.use(slash())

initRoutes(app)

export default app
