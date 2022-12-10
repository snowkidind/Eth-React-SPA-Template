import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { DESTROY_SESSION } from '../actions/types'
import ethReducer from './eth.js'
import dispReducer from './disp.js'

const appReducer = combineReducers({
  form: formReducer,
  eth: ethReducer,
  disp: dispReducer,
  state: (state = {}) => state
})

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) {
    console.log('[Reducers] DESTROY_SESSION')
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
