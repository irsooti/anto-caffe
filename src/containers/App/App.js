import React, { Component } from 'react';
import Register from '../Register/Register';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import Order from '../Order/Order';
import withAuthentication from '../../hoc/withAuthentication';
import Login from '../Login/Login';

class App extends Component {
  render() {
    return (
      <div className="full-height ">
        {/* <nav className="nav default">
          <a className="nav-item">asd</a>
          <a className="nav-item">asd</a>
          <a className="nav-item">asd</a>
          <a className="nav-item">asd</a>
        </nav> */}
        <main>
          <Router>
            <Switch>
              <Route
                path="/ordini"
                exact
                component={withAuthentication(Order)}
              />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </Router>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
