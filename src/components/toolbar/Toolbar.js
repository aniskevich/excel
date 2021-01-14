import {$} from '@core/DOM'
import {ExcelComponentWithState} from '@core/ExcelComponentWithState'
import {TableSelection} from '@components/table/TableSelection'
import {createToolbar} from '@components/toolbar/toolbar.template'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelComponentWithState {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscriptions: ['currentStyles'],
      ...options,
    })
    this.selection = new TableSelection()
  }

  prepare() {
    this.initState(defaultStyles)
  }

  storeChanged({currentStyles}) {
    this.setState(currentStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      const key = Object.keys(value)[0]
      this.$emit('toolbar:applyStyle', value)
      this.setState({[key]: value[key]})
    }
  }
}
