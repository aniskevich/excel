import {$} from '@core/DOM'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) throw new Error('Selector not provided')
    this.changePageHandler = this.changePageHandler.bind(this)
    this.page = null
    this.$placeholder = $(selector)
    this.routes = routes
    this.init()
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }
  changePageHandler() {
    if (this.page) this.page.destroy()
    this.$placeholder.clear()
    const location = ActiveRoute.path
    let Page
    if (location.includes('excel')) {
      Page = this.routes.excel
    } else {
      Page = this.routes.dashboard
    }
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
