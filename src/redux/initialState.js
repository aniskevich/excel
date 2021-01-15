import {storage} from '@core/utils'
import {defaultStyles} from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  title: '',
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})


export const initialState = storage('excel')
  ? normalize(storage('excel'))
  : defaultState
