import {
  APPLY_STYLES,
  CHANGE_STYLES,
  CHANGE_TEXT,
  TABLE_RESIZE,
} from '@redux/types'

export function tableResize(data) {
  return {type: TABLE_RESIZE, data}
}
export function changeText(data) {
  return {type: CHANGE_TEXT, data}
}
export function changeStyles(data) {
  return {type: CHANGE_STYLES, data}
}
export function applyStyles(data) {
  return {type: APPLY_STYLES, data}
}