import {Page} from '@core/Page'
import {debounce, storage} from '@core/utils'
import {createStore} from '@core/createStore'
import {rootReducer} from '@redux/rootReducer'
import {Excel} from '@components/excel/Excel'
import {Header} from '@components/header/Header'
import {Toolbar} from '@components/toolbar/Toolbar'
import {Formula} from '@components/formula/Formula'
import {Table} from '@components/table/Table'
import {normalizeInitialState} from '@redux/initialState'

function getStoreName(params) {
  return 'excel:' + params
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const state = storage(getStoreName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))
    const stateListener = debounce(
        state => storage(getStoreName(params), state),
        300)
    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }
  destroy() {
    this.excel.unmount()
  }
}
