import {$} from '@core/DOM'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '@core/StoreSubscriber'
import * as actions from '@redux/actions'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.emitter = new Emitter()
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const options = {
      emitter: this.emitter,
      store: this.store,
    }
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, options)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  init() {
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
    this.store.dispatch(actions.changeOpenedDate())
  }

  unmount() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.unmount())
  }
}
