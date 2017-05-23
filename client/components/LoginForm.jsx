import React, { PropTypes, PureComponent } from 'react'

export default class LoginForm extends PureComponent {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            name="email"
            type="email"
            className="form-field"
            placeholder="email"
          /><br />
          <input
            type="password"
            type="password"
            className="form-field"
            placeholder="password"
            pattern=".{6,}"
          /><br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
