import React, { Component } from 'react'
import RegisterForm from './RegisterForm.jsx'
import LoginForm from './LoginForm.jsx'
import App from './App.jsx'
import { BrowserRouter as Router, Switch, Route, IndexRoute } from 'react-router-dom'

export default class AppRouter extends Component {
  render () {
    return (
      <Router>
        <App>
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
        </App>
          {/* <IndexRoute component={RegisterForm} /> */}
      </Router>
    )
  }
}
