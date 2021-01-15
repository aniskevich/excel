import {ExcelComponent} from '@core/ExcelComponent'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/DOM'
import * as actions from '@redux/actions'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
    this.selection = new TableSelection()
  }

  toHTML() {
    const title = this.store.getState().title
    return `
      <input class="input" type="text" value="${title}"/>
      <div>
        <div class="button"><i class="material-icons">delete</i></div>
        <div class="button"><i class="material-icons">exit_to_app</i></div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }
}
