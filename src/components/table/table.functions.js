import {$} from '@core/DOM'
import {range} from '@core/utils'

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = event.target.dataset.resize
    let cols
    let value
    if (type === 'col') {
      const colId = $resizer.data.colId
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
        value = coords.width + delta
        $resizer.css({right: '0'})
        cols.forEach(el => $(el).css({width: `${value}px`}))
      } else if (type === 'row') {
        value = coords.height + delta
        $parent.css({height: `${coords.height + delta}px`})
        $resizer.css({bottom: '0'})
      }
      resolve({
        id: $parent.data[type],
        value,
        type,
      })
      $resizer.css({opacity: '0'})
      $resizer.clear()
      document.onmouseup = null
      document.onmousemove = null
    }
  })
}

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.classList.contains('cell')
}

export function matrix(current, target) {
  const rows = range(current.row, target.row)
  const cols = range(current.col, target.col)
  const ids = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
  return ids
}

export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
    case 'ArrowDown':
    case 'Enter':
      ++row
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowRight':
    case 'Tab':
      ++col
      break
    default: return
  }
  return `[data-id="${row}:${col}"]`
}
