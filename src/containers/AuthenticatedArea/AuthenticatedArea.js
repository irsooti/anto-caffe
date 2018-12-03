import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Order from '../Order/Order';
import CollectiveOrders from '../CollectiveOrders/CollectiveOrders';
class AuthenticatedArea extends Component {
  render() {
    return (
      <>
        <nav className="nav default">
          <NavLink className="nav-item" exact to="/orders">
            Gli ordini di oggi
          </NavLink>
          <NavLink className="nav-item" exact to="/order">
            Ordina
          </NavLink>
        </nav>
        <div
          className="container"
          style={{ maxWidth: '1200px', margin: 'auto' }}
        >
          <Router>
            <Switch>
              <Route path="/orders" exact component={CollectiveOrders} />
              <Route path="/order" exact component={Order} />
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  displayName: state.auth.user.displayName
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedArea);
