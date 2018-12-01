import React, { Component } from 'react';
import { connect } from 'react-redux';
import { beginSignUp, beginAuthentication } from '../../store/actions/auth';
import Input from '../../ui/Input/Input';
import cssModule from './Register.module.css';
import Button from '../../ui/Button/Button';

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
        <div className={cssModule.formBlockLabel}>Registrati</div>

        <div className="form block">
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
        {this.props.isPending ? 'loading' : form}
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
