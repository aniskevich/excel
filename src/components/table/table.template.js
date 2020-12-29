const CHAR_CODES = {
  A: 65,
  Z: 90,
}
const createRow = (data, index = '') => {
  return `
    <div class="row">
      <div class="row-info">${index}</div>
      <div class="row-data">${data}</div>
    </div>
 `
}
const createColumn = (content) => {
  return `
    <div class="column">${content}</div>
  `
}
const createCell = (content) => {
  return `
    <div class="cell" contenteditable="">${content}</div>
  `
}
const toChar = (_, index) => String.fromCharCode(CHAR_CODES.A + index)
export const createTable = (rowsCount) => {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')
  const cells = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')
  rows.push(createRow(cols))
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1))
  }
  return rows.join('')
}
