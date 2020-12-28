import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  toHTML() {
    return `
      <div class="excel__header">
        <input class="input" type="text" value="New Table"/>
        <div>
            <div class="button"><i class="material-icons">delete</i></div>
            <div class="button"><i class="material-icons">exit_to_app</i></div>
        </div>
      </div> 
    `
  }
}
