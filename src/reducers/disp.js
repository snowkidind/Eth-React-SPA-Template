import {
  SHOW, 
  HIDE,
  ERROR,
  CLEAR_ERROR,
  MESSAGE,
  CLEAR_MESSAGE,
} from '../actions/types.js'

const DEFAULT_STATE = {
  show: true
}

export default (state = DEFAULT_STATE, action) => {

  const log = false

  switch (action.type) {
      
    case SHOW:
      log && console.log('[display Reducer] SHOW')
      return { ...state, show: true }

    case HIDE:
      log && console.log('[display Reducer] HIDE')
      return { ...state, show: false }

    case ERROR:
      log && console.log('[Display Reducer] Error')
      return { 
        ...state, 
        error: action.error, 
        message: action.message 
      }

    case CLEAR_ERROR:
      log && console.log('[Display Reducer] Clear Error')
      return { 
        ...state, 
        error: null,
        message: null
      }

    case MESSAGE:
      log && console.log('[Display Reducer] Message')
      return { 
        ...state, 
        status: action.status,
        message: action.message, 
        dismiss: action.dismiss,
        target: action.target
      }

    case CLEAR_MESSAGE:
      log && console.log('[Display Reducer] Clear Message')
      return { 
        ...state, 
        status: null,
        message: null,
        dismiss: null,
        target: action.target
      }

    default:
      return {
        ...state
      }
  }
}
