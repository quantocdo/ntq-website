import debounce from 'debounce'

const MIN_HEIGHT = 500

const goFullscreen = () => {
  const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  if (viewportHeight < MIN_HEIGHT) {
    return
  }

  document.querySelector('.section-landing').style.height = `${ viewportHeight }px`
}

document.addEventListener('DOMContentLoaded', goFullscreen)
window.addEventListener('resize', debounce(goFullscreen, 200))
