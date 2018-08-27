export default {
  build(path, params) {
    return [
      path,
      params && Object.entries(params)
        .map(([ k, v ]) => `${ k }=${ encodeURIComponent(v) }`)
        .join('&')
    ].filter(Boolean).join('?')
  }
}
