import {ExcelComponent} from '@core/ExcelComponent'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/DOM'
import * as actions from '@redux/actions'
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
    this.selection = new TableSelection()
  }

  toHTML() {
    const title = this.store.getState().title
    return `
      <input class="input" type="text" value="${title}"/>
      <div>
        <div class="button" data-button="delete">
          <i class="material-icons" data-button="delete">
            delete
          </i>
        </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">
            exit_to_app
          </i>
        </div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'delete') {
      const decision = confirm('Do you really want to delete this table ?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
