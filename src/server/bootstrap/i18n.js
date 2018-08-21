import i18n from 'i18n'
import path from 'path'

import config from 'infrastructure/config'

export default app => {
  i18n.configure({
    locales: [ 'en', 'ja' ],
    defaultLocale: 'en',
    cookie: 'al',
    directory: path.resolve(config._root, '../translations'),
    updateFiles: false,
    objectNotation: false
  })

  app.use(i18n.init)

  app.use((req, res, next) => {
    i18n.setLocale('ja')
    req.setLocale('ja')
    res.setLocale('ja')
    res.locals._locale = 'ja'

    const __ = res.locals.__

    res.locals.__ = (...args) => {
      const translate = __(...args)

      return translate ? translate.trim() : ''
    }

    next()
  })
}
