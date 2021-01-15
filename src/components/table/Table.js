import {$} from '@core/DOM'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@components/table/table.template'
import {isCell, matrix, nextSelector, resizeHandler, shouldResize}
  from '@components/table/table.functions'
import {TableSelection} from '@components/table/TableSelection'
import * as actions from '@redux/actions'
import {defaultStyles} from '@/constants'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', text => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })
    this.$on('formula:done', () => this.selection.current.focus())
    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style)
      this.$dispatch(
          actions.applyStyle({ids: this.selection.selectedIds, value: style})
      )
    })
  }

  toHTML() {
    return createTable(45, this.store.getState())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.error(e.message)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText(
        {
          id: this.selection.current.data.id,
          value,
        }
    )
    )
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    }

    if (isCell(event)) {
      if (event.shiftKey) {
        const current = this.selection.current.id(true)
        const target = $(event.target).id(true)
        const group = matrix(current, target)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup(group)
      } else {
        this.selectCell($(event.target))
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ]
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(event.key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
