export function createStore(rootReducer, initialState = {}) {
  let subscribers = []
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  return {
    subscribe(fn) {
      subscribers.push(fn)
      return {
        unsubscribe() {
          subscribers = subscribers.filter(s => s !== fn)
        },
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      subscribers.forEach(s => s(state))
    },
    getState() {
      return state
    },
  }
}
