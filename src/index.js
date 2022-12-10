import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import Router from './component/Router.js'

import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={createStore(reducers, {
    eth: {}
  }, applyMiddleware(reduxThunk))}>
    <Router />
  </Provider>
)