import {DOMListener} from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor($root, options ={}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.subscriptions = options.subscriptions || []
    this.unsubscribers = []
    this.prepare()
  }
  prepare() {}
  toHTML() {
    return ''
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  storeChanged() {}
  init() {
    this.initDOMListeners()
  }
  unmount() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
