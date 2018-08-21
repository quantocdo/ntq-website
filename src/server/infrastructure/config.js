import path from 'path'

export default {
  _root: path.resolve(__dirname, '..'),
  port: process.env.PORT,
  cms: process.env.CMS
}
