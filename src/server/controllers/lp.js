export default {
  get(req, res, next) {
    res.render('pages/home_en', {
      _highlightedArticles: []
    })
  }
}
