import React, { PropTypes, PureComponent} from 'react'

export default class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You're authenticated with the backend!</p>
      </div>
    )
  }
}
