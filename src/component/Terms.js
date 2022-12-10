import React from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Error from './Error'
import Message from './Message'

const Terms = (props) => {

  const onError = () => {
    const error = 'Unspecifried Error.'
    const message = 'You are probably doing something you shouldnt be doing...'
    props.genericError(error, message)
  }

  const onMessage = () => {
    const message = 'Pay your taxes lest the taxman come git ya'
    const dismiss = true
    const target = '/front'
    props.genericMessage(message, dismiss, target)
  }

  if (props.error) {
    return (<div><Error error={props.error} message={props.message} /></div>);
  } else if (props.status) {
    return (<div><Message status={props.status} message={props.message} /></div>);
  } else {
    return (
      <div>
        Terms and Conditions:
        <button onClick={() => onError()}>Trigger an error.</button>
        <button onClick={() => onMessage()}>Trigger a message</button>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    error: state.disp.error,
    status: state.disp.status
  }
}

export default compose(
  connect(mapStateToProps, actions)
)(Terms)

