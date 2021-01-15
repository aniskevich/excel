import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TEXT, CHANGE_TITLE,
  TABLE_RESIZE,
} from '@redux/types'

export function rootReducer(state, action) {
  let prevState
  let field
  switch (action.type) {
    case TABLE_RESIZE:
      field = `${action.data.type}State`
      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value
      return {...state, [field]: prevState}
    case CHANGE_TEXT:
      prevState = state.dataState || {}
      prevState[action.data.id] = action.data.value
      return {...state, dataState: prevState, currentText: action.data.value}
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      prevState = state.stylesState || {}
      action.data.ids.forEach(id => {
        prevState[id] = {...prevState[id], ...action.data.value}
      })
      return {
        ...state,
        currentStyles: {...state.currentStyles, ...action.data.value},
        stylesState: prevState,
      }
    case CHANGE_TITLE:
      return {...state, title: action.data}
    default: return state
  }
}
