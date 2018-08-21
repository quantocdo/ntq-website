const MIN_HEIGHT = 775

window.addEventListener('load', () => {
  const header = document.querySelector('.site-header')

  const headerHeight = header.getBoundingClientRect().height

  const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  const contentHeight = viewportHeight - headerHeight

  if (contentHeight < MIN_HEIGHT) {
    return
  }

  Array.from(document.querySelectorAll('.page-section'))
    .forEach(
      node => node.style.height = `${ contentHeight }px`
    )
})
