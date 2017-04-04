import React, { PureComponent, PropTypes } from 'react';

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}
export default class App extends PureComponent {

  render() {
    return (
      <div>
        hello from secure app component
      </div>
    )
  }
}
