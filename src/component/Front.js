import React, { useEffect } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Error from './Error'
import Message from './Message'

const Front = (props) => {
  if (props.error) {
    return (<div><Error error={props.error} message={props.message} /></div>);
  } else if (props.status) {
    return (<div><Message status={props.status} message={props.message} /></div>);
  } else {
    return (
      <div>
        Front Page
        { props.account &&
          <div>
            Hello {props.account} You are not a name you are a number!
          </div>
        }
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    account: state.eth.account,
    connected: state.eth.connected,
    balance: state.eth.balance,
    accountChanged: state.eth.accountChanged,
    chainId: state.eth.chainId,
    error: state.disp.error
  }
}

export default compose(
  connect(mapStateToProps, actions)
)(Front)

