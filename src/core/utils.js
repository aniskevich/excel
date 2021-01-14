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
