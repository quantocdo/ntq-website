import path from 'path'

export default {
  _root: path.resolve(__dirname, '..'),
  production: process.env.NODE_ENV === 'production',
  port: process.env.PORT,
  cms: {
    url: process.env.CMS_URL,
    clientId: process.env.CMS_CLIENT_ID,
    clientSecret: process.env.CMS_CLIENT_SECRET
  },
  cdn: {
    url: process.env.CDN_URL
  },
  baseUrl: {
    protocol: process.env.BASE_URL_PROTOCOL,
    en: process.env.BASE_URL_EN,
    ja: process.env.BASE_URL_JA
  },
  ses: {
    receiver: process.env.SES_RECEIVER,
    sender: process.env.SES_SENDER,
    region: process.env.SES_REGION,
    accessKeyId: process.env.SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY
  }
}
