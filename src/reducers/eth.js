import {
  ETH_CONNECT
} from '../actions/types.js'

const DEFAULT_STATE = {
  secret: ''
}

const eth = (state = DEFAULT_STATE, action) => {

  const log = false
  switch (action.type) {
    case ETH_CONNECT:
      log && console.log('[web3 Reducer] ETH Connect')
      return { 
        ...state, 
        account: action.account.address, 
        connected: action.account.connected,
        balance: action.account.balance.toString(),
        chainId: action.account.chainId
      }
    default:
      return {
        ...state
      }
  }
}

export default eth