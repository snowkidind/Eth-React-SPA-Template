import { ethers } from 'ethers'
import {
  ETH_CONNECT,
  ERROR
} from './types'

const ethereum = window.ethereum
const provider = new ethers.providers.Web3Provider(ethereum)

const connectToMetamask = async () => {  
  const accounts = await provider.send('eth_requestAccounts', [])
  const balance = await provider.getBalance(accounts[0])
  const chain = parseInt(ethereum.chainId)
  return { address: accounts[0], balance: balance, chainId: chain }
}

// connect with metamask to expose ethereum address etc
export const ethConnect = () => {
  return async dispatch => {
    try {
      const account = await connectToMetamask()
      dispatch({
        type: ETH_CONNECT,
        account: account,
        connected: true
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        error: 'Browser Extension Issue:',
        message: 'Couldn\'t connect.'
      })
    }
  }
}

export const accountsChanged = (selectedAccount) => {
  return async dispatch => {
    try {
      if (selectedAccount > 0) {
        const account = await connectToMetamask()
        dispatch({
          type: ETH_CONNECT,
          account: account,
          connected: true
        })
      } else {
        dispatch({
          type: ERROR,
          error:'Browser Extension Issue:',
          message:'Issue with changing accounts.'
        })
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }
}

