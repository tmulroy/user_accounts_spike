import React, { PureComponent, PropTypes } from 'react';
import RegisterForm from './RegisterForm.jsx';

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
};

export default class App extends PureComponent {

  render() {
    return (
    <RegisterForm />
    )
  };
};
