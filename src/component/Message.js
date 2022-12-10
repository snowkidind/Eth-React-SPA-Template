import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { useNavigate } from 'react-router-dom'

const Message = (props) => {

  const navigate = useNavigate()

  useEffect(() => {
    if (props.dismiss) {
      props.hideHeaders()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closeMessage = () => {
    props.showHeaders()
    props.clearMessage(props.target)
    if (props.target) {
      navigate(props.target)
    }
  }

  function createMarkup(message) {
    return { __html: message };
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={createMarkup(props.message)} />
      {props.dismiss &&
        <button onClick={closeMessage}>Ok.</button>
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    status:state.disp.status,
    message: state.disp.message,
    dismiss: state.disp.dismiss,
    target: state.disp.target,
  }
}

export default connect(mapStateToProps, actions)(Message)
