export default {
  get(req, res, next) {
    const { _locale } = res.locals

    res.render(`pages/services_${ _locale }`)
  }
}
