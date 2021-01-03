export class TableSelection {
  static className = 'selected'
  constructor() {
    this.elements = []
    this.current = null
  }
  select($el) {
    this.clear()
    this.elements.push($el)
    $el.focus().addClass(TableSelection.className)
    this.current = $el
  }
  selectGroup(group = []) {
    this.clear()
    this.elements = group
    this.elements.forEach(el => el.addClass(TableSelection.className))
  }
  clear() {
    this.elements.forEach(el => el.removeClass(TableSelection.className))
    this.elements = []
  }
}
