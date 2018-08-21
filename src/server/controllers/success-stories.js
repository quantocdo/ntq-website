export default {
  get(req, res, next) {
    res.render(`pages/success-stories_${ res.locals._locale }`)
  }
}
