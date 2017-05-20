import React, { PureComponent } from 'react';

export default class RegisterForm extends PureComponent {
  render() {
    return (
      <form>
        <h1>Register</h1>
        <input type='text' placeholder='First Name'/>
        <input type='text' placeholder='Last Name'/>
        <input type="email" placeholder="Enter email" />
        <input
          type="password"
          pattern=".{6,}"
          placeholder='Password 6 characters minimum'
        />
        <input type="submit" />
      </form>
    )
  };
};
