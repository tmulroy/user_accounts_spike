import React, { PureComponent, PropTypes } from 'react';
import RegisterForm from './RegisterForm.jsx';
import LoginForm from './LoginForm.jsx'

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
};



export default class App extends PureComponent {

  render() {
    return (
      <div>
        <RegisterForm />
        <LoginForm />
      </div>
    )
  };
};
