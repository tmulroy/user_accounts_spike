import React, { PropTypes, PureComponent } from 'react'
const request = require('superagent')

export default class LoginForm extends PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  validateEmail(emailString) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(`regex test: ${re.test(emailString)}`)
   return re.test(emailString);
  }

  validatePassword(passwordString) {
    return passwordString.length >= 6
  }

  handleChange(e) {
    e.preventDefault()
    let state = Object.assign({}, this.state)
    switch (e.target.name) {
      case "email":
        (this.validateEmail(e.target.value))
        ? state[e.target.name] = e.target.value
        : null
        break
      case "password":
        (this.validatePassword(e.target.value))
        ? state[e.target.name] = e.target.value
        : null
        break
      default:
        state[e.target.name] = e.target.value
        break
    }
    this.setState(state)
  }

  submitForm(e) {
    // NOTE: need to get cookie.id and use that on request...
    e.preventDefault()
    request.post('https://localhost:8080/api/login')
      .send({ email: this.state.email, password: this.state.password})
      .withCredentials()
      .end((err, res) => {
        console.log(`response from server ${JSON.stringify(res)}`)
      })
  }
  render() {
    return (
        <form onSubmit={this.submitForm} onChange={this.handleChange}>
          <h1>Login</h1>
          <input
            name="email"
            type="email"
            className="form-field"
            placeholder="email"
          /><br />
          <input
            type="password"
            name="password"
            className="form-field"
            placeholder="password"
            pattern=".{6,}"
          /><br />
          <input type="submit" />
        </form>
    )
  }
}
