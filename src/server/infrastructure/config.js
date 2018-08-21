import path from 'path'

export default {
  _root: path.resolve(__dirname, '..'),
  port: process.env.PORT,
  cms: {
    url: process.env.CMS_URL,
    clientId: process.env.CMS_CLIENT_ID,
    clientSecret: process.env.CMS_CLIENT_SECRET
  },
  cdn: {
    url: process.env.CDN_URL
  }
}
