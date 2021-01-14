import {storage} from '@core/utils'
import {defaultStyles} from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
}

export const initialState = storage('excel')
  ? storage('excel')
  : defaultState
