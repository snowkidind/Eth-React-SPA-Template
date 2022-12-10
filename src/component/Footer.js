import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"

import * as actions from "../actions"

function Footer(props) {
  return (
    <div>
      <Link to="/terms">T&C</Link>
    </div>
  )
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, actions)(Footer)
