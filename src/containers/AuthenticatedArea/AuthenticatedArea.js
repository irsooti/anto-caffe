import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Order from '../Order/Order';
import cssModule from './AuthenticatedArea.module.css';
import CollectiveOrders from '../CollectiveOrders/CollectiveOrders';
import NotFound from '../NotFound/NotFound';
class AuthenticatedArea extends Component {
  render() {
    return (
      <>
        <nav className="nav default">
          <NavLink className="nav-item" exact to="/dailyorder">
            Gli ordini di oggi
          </NavLink>
          <NavLink className="nav-item" exact to="/order">
            Ordina
          </NavLink>
        </nav>
        <div className={cssModule.layout}>
          <div>
            <Router>
              <Switch>
                <Route path="/dailyorder" exact component={CollectiveOrders} />
                <Route path="/order" exact component={Order} />
                <Route path="/" exact component={Order} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>
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
