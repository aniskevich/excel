export const capitalize = string => {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const range = (start, end) => {
  if (start > end) [end, start] = [start, end]
  return new Array((end - start) + 1)
      .fill('')
      .map((_, index) => start + index)
}

export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.parse(JSON.stringify(a)) === JSON.parse(JSON.stringify(b))
  }
  return a === b
}

export function camelToDashCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      fn(...args)
    }
    timeout = setTimeout(later, wait)
  }
}

export function parse(text = '') {
  if (text.startsWith('=')) {
    try {
      return eval(text.slice(1)).toString()
    } catch (e) {
      return text
    }
  }
  return text
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
