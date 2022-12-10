import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { d } from '../utils/decimals.js'

function Header(props) {

  const chainError = () => {
    const error = 'Chain ID Error.'
    const message = 'The project is supported on Mainnet only, please switch to mainnet in your browser extension...'
    props.genericError(error, message)
  }

  const connectToMM = (event) => {
    props.ethConnect()
    event.currentTarget.disabled = true
  }

  return (
    <nav>
      <span>
        <Link to='/'>NFTzz</Link>

        {props.chainId === 1 &&
          <div>
            <div>Account: {props.account && props.account} {props.balance && d(props.balance, 18, 4) + ' ETH'}</div>
          </div>
        }

        {props.chainId !== 1 && props.chainId > 0 && chainError()}
        {!props.chainId !== 1 && 
          <div>{!props.account && <button onClick={connectToMM}>Connect to Metamask</button>}</div>
        }

      </span>
    </nav>
  )
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, actions)(Header)
