const MIN_HEIGHT = 775

document.addEventListener('DOMContentLoaded', () => {
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

  Array.from(document.querySelectorAll('.site-content.page-full .page-section'))
    .forEach(
      node => node.style.height = `${ contentHeight }px`
    )
})
