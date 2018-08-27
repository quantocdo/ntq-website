import debounce from 'debounce'

const arrangePosts = () => {
  const wrapper = document.querySelector('.posts')
  const computedStyle = window.getComputedStyle(wrapper)

  const rowHeight = parseInt(computedStyle.getPropertyValue('grid-auto-rows'), 10)
  const rowGap = parseInt(computedStyle.getPropertyValue('grid-row-gap'), 10)

  const posts = Array.from(wrapper.querySelectorAll('.post'))
    .map(
      node => ({
        node,
        content: node.querySelector('.content')
      })
    )
    .map(
      post => ({
        ...post,
        rows: Math.ceil(
          (post.content.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
        )
      })
    )

  posts.forEach(
    post => post.node.style.gridRowEnd = `span ${ post.rows }`
  )
}

const debouncedArrangePosts = debounce(arrangePosts, 200)

window.addEventListener('load', debouncedArrangePosts)
window.addEventListener('resize', debouncedArrangePosts)
