import {ExcelComponent} from '@core/ExcelComponent'

export class ExcelComponentWithState extends ExcelComponent {
  constructor(...args) {
    super(...args)
  }
  initState(initialState = {}) {
    this.state = {...initialState}
  }
  setState(newState) {
    this.state = {...this.state, ...newState}
    this.$root.html(this.template)
  }
}
