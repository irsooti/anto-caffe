import React, { Component } from 'react';
import Register from '../Register/Register';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import withAuthentication from '../../hoc/withAuthentication';
import Login from '../Login/Login';
import { beginVerifyToken } from '../../store/actions/auth';
import AuthenticatedArea from '../AuthenticatedArea/AuthenticatedArea';
import NotFound from '../NotFound/NotFound';

class App extends Component {
  componentDidMount() {
    this.props.preAuthenticate();
  }

  render() {
    return (
      <div className="full-height ">
        <Router>
          <Switch>
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/" component={withAuthentication(AuthenticatedArea)} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  preAuthenticate: token => dispatch(beginVerifyToken(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
