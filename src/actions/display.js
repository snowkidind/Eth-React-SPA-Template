import {
  SHOW,
  HIDE,
  MESSAGE,
  ERROR,
  CLEAR_ERROR,
  CLEAR_MESSAGE
} from './types'

export const showHeaders = () => {
  return async dispatch => {
    dispatch({
      type: SHOW,
      show: true
    })
  }
}

export const hideHeaders = () => {
  return async dispatch => {
    dispatch({
      type: HIDE,
      show: false
    })
  }
}

export const genericError = (error, message) => {
  return async dispatch => {
    dispatch({
      type: ERROR,
      error: error,
      message: message
    })
  }
}

export const clearError = () => {
  return async dispatch => {
    dispatch({
      type: CLEAR_ERROR,
      error: null
    })
  }
}

export const genericMessage = (message, dismiss, target) => {
  return async dispatch => {
    dispatch({
      type: MESSAGE,
      status: true,
      message: message,
      dismiss: dismiss,
      target: target
      
    })
  }
}

export const clearMessage = (target) => {
  return async dispatch => {
    dispatch({
      type: CLEAR_MESSAGE,
      target: target
    })
  }
}
