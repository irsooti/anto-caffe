import React, { Component } from 'react';
import { connect } from 'react-redux';
import { beginSignUp } from '../../store/actions/auth';
import Input from '../../ui/Input/Input';
import cssModule from './Register.module.css';
import Button from '../../ui/Button/Button';
import { Redirect, Link } from 'react-router-dom';

class Register extends Component {
  state = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };

  onChangeInput = propName => val => {
    const state = { ...this.state };
    state[propName] = val;

    this.setState({ ...state });
  };

  onSubmit = evt => {
    const { name, surname, email, password } = this.state;

    if (!name || !surname || !email || !password) return false;

    evt.preventDefault();

    this.props.signUp(email, password, name, surname);
  };

  componentDidUpdate() {}

  render() {
    const form = (
      <form className={cssModule.formBlock} onSubmit={this.onSubmit}>
        <div className="form block">
          <h3>Registrati</h3>
          <span style={{ marginTop: '10px' }}>
            Hai già un account?{' '}
            <Link style={{ marginLeft: '5px' }} to="/login">
              {' '}
              Accedi
            </Link>
          </span>

          {this.props.isError ? (
            <div className={cssModule.errorBlock}>{this.props.isError}</div>
          ) : null}
          <Input
            onChange={this.onChangeInput('name')}
            placeholder="Mario"
            label="Nome"
            block={true}
            required={true}
            type="text"
          />
          <Input
            onChange={this.onChangeInput('surname')}
            placeholder="Rossi"
            label="Cognome"
            block={true}
            type="text"
            required={true}
          />
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
        {this.props.isPending ? '' : form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isPending: state.auth.isSigninUp,
  isError: state.auth.signupError,
  isSuccess: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  signUp: (email, password, name, surname) =>
    dispatch(beginSignUp(email, password, name, surname))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
