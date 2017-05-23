import React, { Component } from 'react';
const request = require('superagent')
const https = require('https')

export default class RegisterForm extends Component {
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
    e.preventDefault()
    request.post('https://localhost:8080/api/register')
      .send({ email: this.state.email, password: this.state.password})
      .end((err, res) => {
        console.log(`response from server ${JSON.stringify(res)}`)
      })
  }

  render() {
    console.log(`RegisterForm state ${JSON.stringify(this.state)}`)
    return (
      <form onSubmit={this.submitForm} onChange={this.handleChange}>
        <h1>Register</h1>
        <input
          name="firstname"
          type="text"
          className="form-field"
          placeholder="First Name"
        /><br />
        <input
          name="lastname"
          type="text"
          className="form-field"
          placeholder="Last Name"
        /><br />
        <input
          name="email"
          type="email"
          className="form-field"
          placeholder="Email"
        /><br />
        <input
          name="password"
          type="password"
          className="form-field"
          placeholder="Password"
        /><br />
        <input type="submit"  />
      </form>
    )
  };
};
