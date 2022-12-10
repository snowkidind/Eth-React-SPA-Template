import React from 'react';
import * as actions from "../actions"
import { connect } from 'react-redux'
import { compose } from 'redux'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import App from './App.js' // contains all the web3 state stuff
import Front from './Front.js'
import Terms from './Terms.js'

const Router = (props) => {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Front />} />
          <Route path="/front" element={<Front />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </App>
    </BrowserRouter>
  )
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  connect(mapStateToProps, actions)
)(Router)

