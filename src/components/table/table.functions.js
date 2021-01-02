import {$} from '@core/DOM'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = event.target.dataset.resize
  let cols
  if (type === 'col') {
    const colId = $resizer.$el.dataset.colId
    cols = $root.findAll(`[data-col="${colId}"]`)
  }
  let delta
  const $helper = $.create('div', 'helper')
  $resizer.append($helper)
  document.onmousemove = e => {
    $resizer.css({opacity: '1'})
    if (type === 'col') {
      delta = e.pageX - coords.right
      $resizer.css({right: -delta + 'px'})
    } else {
      delta = e.pageY - coords.bottom
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    if (type === 'col') {
      $resizer.css({right: '0'})
      cols.forEach(el => $(el).css({width: `${coords.width + delta}px`}))
    } else if (type === 'row') {
      $parent.css({height: `${coords.height + delta}px`})
      $resizer.css({bottom: '0'})
    }
    $resizer.css({opacity: '0'})
    $resizer.clear()
    document.onmouseup = null
    document.onmousemove = null
  }
}

export function shouldResize(event) {
  return event.target.dataset.resize
}
