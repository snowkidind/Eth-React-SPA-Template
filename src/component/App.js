import React, { useEffect, useState } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Header from './Header.js'
import Footer from './Footer.js'

const App = (props) => {

  const [ethereum] = useState(window.ethereum)
  const connectToMM = () => {
    props.ethConnect()
  }
  useEffect(() => {
    async function accountChange() {
      ethereum.on('accountsChanged', async function (accounts) {
        if (props.account !== accounts[0]) {
          props.accountsChanged(accounts[0])
        }
      })
    }
    accountChange()
    ethereum.on('chainChanged', () => {
      window.location.reload()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (props.connected && !props.account) { connectToMM() } // probably not working
  if (props.accountChanged) { connectToMM() }

  return (
    <div>
      {props.show && <Header account={props.account} balance={props.balance} chainId={props.chainId} />}
      <div>
        {props.children}
      </div>
      {props.show && <Footer />}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    account: state.eth.account,
    connected: state.eth.connected,
    balance: state.eth.balance,
    accountChanged: state.eth.accountChanged,
    chainId: state.eth.chainId,
    show: state.disp.show,
  }
}

export default compose(
  connect(mapStateToProps, actions)
)(App)