import React, { PureComponent } from 'react';

export default class RegisterForm extends PureComponent {
  render() {
    return (
      <form>
        <input type="email" placeholder="Enter email" />
        <input
          type="password"
          pattern=".{6,}"
        />
        <input type="submit" />
      </form>
    )
  };
};
