export default {
  get(req, res, next) {
    const { _locale } = res.locals

    res.render(`pages/service`)
  }
}
