import React, { Component } from 'react';
import { connect } from 'react-redux';
import { beginAuthentication } from '../../store/actions/auth';
import Input from '../../ui/Input/Input';
import cssModule from './Login.module.css';
import Button from '../../ui/Button/Button';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onChangeInput = propName => val => {
    const state = { ...this.state };
    state[propName] = val;

    this.setState({ ...state });
  };

  onSubmit = evt => {
    const { email, password } = this.state;

    if (!email || !password) return false;

    evt.preventDefault();

    this.props.signIn(email, password);
  };

  componentDidUpdate() {}

  render() {
    const form = (
      <form className={cssModule.formBlock} onSubmit={this.onSubmit}>
        <div className="form block">
          <h3>Login</h3>
          <Input
            onChange={this.onChangeInput('email')}
            placeholder="email"
            label="Email"
            block={true}
            required={true}
            type="email"
          />
          <Input
            onChange={this.onChangeInput('password')}
            placeholder="Password"
            label="Password"
            required={true}
            type="password"
            block={true}
          />
        </div>
        <Button type="submit" text="Invia" />
      </form>
    );

    return (
      <div className={cssModule.background}>
        {this.props.isSuccess ? <Redirect to="/" /> : null}
        {this.props.isPending ? 'loading' : form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isPending: state.auth.isPending,
  isError: state.auth.signinError,
  isSuccess: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(beginAuthentication(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
