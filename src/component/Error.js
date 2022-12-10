import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

const Error = (props) => {

  function closeMessage() {
    props.clearError()
    props.showHeaders()
  }

  useEffect(() => {
    props.hideHeaders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function createMarkup(message) {
    return { __html: message }
  }

  console.log('ERROR: ' + props.error)
  console.log('ERROR_MSG: ' + props.message)

  return (
    <div>
      <div dangerouslySetInnerHTML={createMarkup(props.error)} />
      <div dangerouslySetInnerHTML={createMarkup(props.message)} />
      <button onClick={closeMessage}>Ok.</button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    error: state.disp.error,
    message: state.disp.message
  }
}

export default connect(mapStateToProps, actions)(Error)

