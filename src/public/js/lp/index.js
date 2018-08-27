const MIN_HEIGHT = 500

document.addEventListener('DOMContentLoaded', () => {
  const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  if (viewportHeight < MIN_HEIGHT) {
    return
  }

  document.querySelector('.section-landing').style.height = `${ viewportHeight }px`

  // Array.from(document.querySelectorAll('.site-content.page-full .page-section'))
  //   .forEach(
  //     node => node.style.height = `${ viewportHeight }px`
  //   )
})
