import {storage} from '@core/utils'

function toHTML(key) {
  const param = key.split(':')[1]
  const model = storage(key)
  return `
    <li class="db__record">
      <a href="#excel/${param}">${model.title}</a>
      <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </strong>
    </li>
  `
}

export function createTableRecords() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>No tables yet</p>`
  }
  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}
