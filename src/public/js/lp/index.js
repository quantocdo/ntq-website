const MIN_HEIGHT = 775

document.addEventListener('DOMContentLoaded', () => {
  const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  if (viewportHeight < MIN_HEIGHT) {
    return
  }

  Array.from(document.querySelectorAll('.site-content.page-full .page-section'))
    .forEach(
      node => node.style.height = `${ viewportHeight }px`
    )
})
