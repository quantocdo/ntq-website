import asset from './asset'
import config from './config'
import i18n from './i18n'
import routes from './routes'
import viewEngine from './view-engine'

export default app => {
  asset(app)
  config(app)
  i18n(app)
  routes(app)
  viewEngine(app)
}
