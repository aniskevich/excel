import {defaultStyles} from '@/constants'
import {camelToDashCase} from '@core/utils'

const CHAR_CODES = {
  A: 65,
  Z: 90,
}
const DEFAULT_HEIGHT = 24
const getHeight = (state, index) => {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}
const createRow = (data, index = '', state) => {
  return `
    <div 
        class="row" 
        data-type="resizable" 
        data-row="${index}" 
        style="height: ${getHeight(state, index)}"
    >
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
const createColumn = ({content, index, width}) => {
  return `
    <div 
        class="column" 
        data-type="resizable" 
        data-col="${index}" 
        style="width: ${width}"
    >
        ${content}
        <div class="col-resize" data-resize="col" data-col-id="${index}"></div>
    </div>
    
  `
}
function createCell(row, state) {
  return function(_, index) {
    const id = `${row}:${index}`
    const styles = Object.keys(defaultStyles)
        .map(key => `${camelToDashCase(key)}: ${defaultStyles[key]}`).join(';')
    const width = getWidth(state.colState, index)
    return `
        <div 
            class="cell" 
            contenteditable="" 
            data-col="${index}" 
            data-id="${id}"
            style="${styles}; width: ${width}"
        >${state.dataState[id] || ''}</div>
    `
  }
}

const toChar = (_, index) => String.fromCharCode(CHAR_CODES.A + index)
const DEFAULT_WIDTH = 120
const getWidth = (state, index) => {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}
function withWidthFrom(state) {
  return function(content, index) {
    return {
      content, index, width: getWidth(state.colState, index),
    }
  }
}

export const createTable = (rowsCount, state) => {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createColumn)
      .join('')

  rows.push(createRow(cols, '', {}))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row, state))
        .join('')
    rows.push(createRow(cells, row + 1, state.rowState))
  }
  return rows.join('')
}
