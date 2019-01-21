import React, { Component } from 'react';
import { connect } from 'react-redux';
import { beginAuthentication } from '../../store/actions/auth';
import Input from '../../ui/Input/Input';
import MessageBar from '../../ui/MessageBar/MessageBar';
import cssModule from './Login.module.css';
import Button from '../../ui/Button/Button';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import { resetPassword } from '../../api/auth';
import { ENTRY_POINT } from '../App/App';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isRecoveringPassword: false,
    isRecovered: false,
    recoveredError: false
  };

  onChangeInput = propName => val => {
    const state = { ...this.state };
    state[propName] = val;

    this.setState({ ...state });
  };

  onSubmit = evt => {
    const { email, password } = this.state;
    evt.preventDefault();

    if (this.props.location.pathname === '/login/reset') {
      if (!email) return false;
      resetPassword(email)
        .then(r => {
          this.setState({ isRecovered: true, recoveredError: false });
          this.props.history.push(`${this.props.match.path}/`);
        })
        .catch(r =>
          this.setState({ recoveredError: r.message, isRecovered: false })
        );
    }

    if (!email || !password) return false;

    this.props.signIn(email, password);
  };

  componentDidUpdate() {}

  render() {
    const { isRecovered, recoveredError } = this.state;
    const resetPasswordFragment = (
      <>
        <div className="form block">
          <h3>Reset password</h3>
          <span style={{ marginTop: '10px' }}>
            Non hai un account?{' '}
            <Link style={{ marginLeft: '5px' }} to="/register">
              {' '}
              Registrati
            </Link>
          </span>
          {this.props.isError ? (
            <div className={cssModule.errorBlock}>{this.props.isError}</div>
          ) : null}
          <Input
            onChange={this.onChangeInput('email')}
            placeholder="email"
            label="Email"
            block={true}
            required={true}
            type="email"
          />
        </div>
        <Button type="submit" text="Invia" />

        <div>
          <Link to={`${this.props.match.path}/`}>
            <span aria-label="back" role="img">
              🔙
            </span>{' '}
            Torna a login
          </Link>
        </div>
      </>
    );

    const loginFragment = (
      <>
        <div className="form block">
          <h3>Login</h3>
          <span style={{ marginTop: '10px' }}>
            Non hai un account?{' '}
            <Link style={{ marginLeft: '5px' }} to="/register">
              {' '}
              Registrati
            </Link>
          </span>
          {this.props.isError ? (
            <div className={cssModule.errorBlock}>{this.props.isError}</div>
          ) : null}

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
            currentPassword={true}
            block={true}
          />
        </div>
        <Button type="submit" text="Invia" />
        <div>
          <Link title="Vero Daniel?" to={`${this.props.match.path}/reset`}>
            Hai dimenticato la password?
          </Link>
        </div>
      </>
    );

    const form = (
      <form className={cssModule.formBlock} onSubmit={this.onSubmit}>
        <Switch>
          <Route
            path={`${this.props.match.path}/reset`}
            render={() => resetPasswordFragment}
          />
          <Route
            path={`${this.props.match.path}/`}
            render={() => loginFragment}
          />
        </Switch>
      </form>
    );

    return (
      <>
        {isRecovered ? (
          <MessageBar status="success">
            Hai inviato una richiesta di reset password, controlla la mail
          </MessageBar>
        ) : null}
        {recoveredError && this.props.location.pathname === '/login/reset' ? (
          <MessageBar status="danger">{recoveredError}</MessageBar>
        ) : null}
        <div className={cssModule.background}>
          {this.props.isSuccess ? <Redirect to={ENTRY_POINT} /> : null}
          {this.props.isPending ? '' : form}
        </div>
      </>
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
