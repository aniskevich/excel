import {ExcelComponent} from '@core/ExcelComponent'
import {TableSelection} from '@/components/table/TableSelection';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: [],
      ...options,
    })
    this.selection = new TableSelection()
  }

  toHTML() {
    return `
      <input class="input" type="text" value="New Table"/>
      <div>
        <div class="button"><i class="material-icons">delete</i></div>
        <div class="button"><i class="material-icons">exit_to_app</i></div>
      </div>
    `
  }
}
