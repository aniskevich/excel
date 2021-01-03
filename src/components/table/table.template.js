const CHAR_CODES = {
  A: 65,
  Z: 90,
}
const createRow = (data, index = '') => {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index}
        ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">
        ${data}
      </div>
    </div>
 `
}
const createColumn = (content, index) => {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${content}
        <div class="col-resize" data-resize="col" data-col-id="${index}"></div>
    </div>
    
  `
}
function createCell(row) {
  return function(_, index) {
    return `
        <div 
            class="cell" 
            contenteditable="" 
            data-col="${index}" 
            data-id="${row}:${index}"
        ></div>
    `
  }
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

  rows.push(createRow(cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('')
    rows.push(createRow(cells, row + 1))
  }
  return rows.join('')
}
