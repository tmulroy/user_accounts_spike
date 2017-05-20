import React, { PropTypes, PureComponent } from 'react'

export default class LoginForm extends PureComponent {
  render() {
    return (
      <form>
        <input
          type="password"
          pattern=".{6,}"
        />
        <input type="submit" />
      </form>
    )
  }
}
