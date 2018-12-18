import React, { Component } from 'react';
import Register from '../Register/Register';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import withAuthentication from '../../hoc/withAuthentication';
import Login from '../Login/Login';
import { beginVerifyToken } from '../../store/actions/auth';
import AuthenticatedArea from '../AuthenticatedArea/AuthenticatedArea';
import NotFound from '../NotFound/NotFound';
import { retrieveOrdersWithSuccess } from '../../store/actions/orders';
import { onDailyCheckoutChange } from '../../api/orders';

export class App extends Component {
  componentDidMount() {
    this.props.preAuthenticate();
  }

  componentDidUpdate() {
    const { onOrdersChange, isAuthenticated } = this.props;

    if (isAuthenticated)
      onDailyCheckoutChange(resp => {
        onOrdersChange(resp);
      });
  }

  render() {
    return (
      <div className="full-height ">
        <Router>
          <Switch>
            <Route path="/register" exact component={Register} />
            <Route path="/login" component={Login} />
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
  preAuthenticate: token => dispatch(beginVerifyToken(token)),
  onOrdersChange: resp => dispatch(retrieveOrdersWithSuccess(resp))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
