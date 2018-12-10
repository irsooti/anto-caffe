import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Order from '../Order/Order';
import cssModule from './AuthenticatedArea.module.css';
import CollectiveOrders from '../CollectiveOrders/CollectiveOrders';
import NotFound from '../NotFound/NotFound';
import Button from '../../ui/Button/Button';
import { logout } from '../../store/actions/auth';
class AuthenticatedArea extends Component {
  render() {
    const navbar = (
      <nav className="nav default">
        <div className="nav--left">
          <NavLink className="nav-item" exact to="/dailyorder">
            Gli ordini di oggi
          </NavLink>
          <NavLink className="nav-item" exact to="/order">
            Ordina
          </NavLink>
        </div>
        <div className="nav--right">
          <span>
            <Button
              onClick={this.props.onLogout}
              type="small"
              size="md"
              text="Logout"
            />
          </span>
        </div>
      </nav>
    );
    const emailNotVerifiedFragment = (
      <>
        {navbar}
        <div className={cssModule.layoutMailNotVerified}>
          <div className={cssModule.mailNotVerifiedContainer}>
            <div className={cssModule.mailBlock}>
              <div className={cssModule.envelop}>
                <span className="fa fa-envelope-open" />
              </div>
              <div className={cssModule.mailBlockContent}>
                Ti è stata inviata una mail di verifica
              </div>
              <span>Verifica su {this.props.email} per poter accedere</span>
            </div>
          </div>
        </div>
      </>
    );

    const emailVerifiedFragment = (
      <>
        {navbar}
        <div className={cssModule.layout}>
          <div>
            <Router>
              <Switch>
                <Route path="/dailyorder" component={CollectiveOrders} />
                <Route path="/order" exact component={Order} />
                <Route path="/" exact component={Order} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>
        </div>
      </>
    );
    return this.props.emailVerified
      ? emailVerifiedFragment
      : emailNotVerifiedFragment;
  }
}

const mapStateToProps = state => ({
  displayName: state.auth.user.displayName,
  emailVerified: state.auth.user.emailVerified,
  email: state.auth.user.email
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedArea);
