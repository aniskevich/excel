import {ExcelComponent} from '@core/ExcelComponent'
import {TableSelection} from '@/components/table/TableSelection'

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: [],
      ...options,
    })
    this.selection = new TableSelection()
  }

  toHTML() {
    return `
        <div class="button">
          <i class="material-icons">format_align_left</i>
        </div>
        <div class="button">
          <i class="material-icons">format_align_center</i>
        </div>
        <div class="button">
          <i class="material-icons">format_align_right</i>
        </div>
        <div class="button">
          <i class="material-icons">format_bold</i>
        </div>
        <div class="button">
          <i class="material-icons">format_italic</i>
        </div>
        <div class="button">
          <i class="material-icons">format_underlined</i>
        </div>
    `
  }
}
