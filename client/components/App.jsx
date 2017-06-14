import React, { Component } from 'react'
import RegisterForm from './RegisterForm.jsx'
import LoginForm from './LoginForm.jsx'
import { NavLink } from 'react-router-dom'
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update')
//   whyDidYouUpdate(React)
// };


export default class App extends Component {

  render() {
    return (
        <div>
            <ul>
              <li><NavLink to="/register">Register</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </ul>
            {this.props.children}
        </div>
    )
  };
};
