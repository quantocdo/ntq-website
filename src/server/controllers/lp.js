export default {
  get(req, res, next) {
    const { _locale } = res.locals

    res.render(`pages/lp_${ _locale }`, {
      _highlightedArticles: []
    })
  }
}
