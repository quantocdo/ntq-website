const FLOAT_SPACE = 150

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header')
  const full = document.querySelector('.site-content.page-full')

  if (!full) {
    header.classList.add('float')

    return
  }

  document.addEventListener('scroll', () => {
    if (window.scrollY > FLOAT_SPACE) {
      header.classList.add('float')
    } else {
      header.classList.remove('float')
    }
  })
})
