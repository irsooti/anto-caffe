import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Order from '../Order/Order';
import cssModule from './AuthenticatedArea.module.css';
import CollectiveOrders from '../CollectiveOrders/CollectiveOrders';
import NotFound from '../NotFound/NotFound';
import { logoutFlow } from '../../store/actions/auth';
import Toolbar from '../Toolbar/Toolbar';
import MessageBar from '../../ui/MessageBar/MessageBar';
import { retrieveOrdersWithSuccess } from '../../store/actions/orders';
import MyOrders from '../MyOrders/MyOrders';
import Profile from '../Profile/Profile';
import Chat from '../Chat/Chat';
import { onLockDailyChange } from '../../api/orders';
import AuthenticatedContext from './AuthenticatedContext';
import defaultAvatar from '../../assets/avatar.svg';
const { REACT_APP_INFO } = process.env;

const getOrderHHSS = isoDate => {
  let date = new Date(isoDate);
  return `${date.getHours()}:${date.getMinutes()}`;
};

class AuthenticatedArea extends Component {
  state = {
    toolbarIsOpen: false,
    orderer: null,
    profileMenuIsActive: false
  };

  toggleToolbar = () => {
    this.setState(state => ({ toolbarIsOpen: !state.toolbarIsOpen }));
  };

  componentDidMount = () => {
    onLockDailyChange(resp => {
      this.setState({ orderer: resp });
    });
  };

  toggleProfileMenu = () => {
    this.setState(state => ({
      profileMenuIsActive: !state.profileMenuIsActive
    }));
  };

  render() {
    const { orderer } = this.state;
    const navbar = (
      <nav className="nav default">
        <div className="nav--left">
          <span
            className="nav-item"
            style={{ cursor: 'pointer', padding: '15px 25px' }}
            onClick={this.toggleToolbar}
          >
            <span className="fa fa-bars" />
          </span>
        </div>
        <div className="nav--right">
          <div
            onClick={this.toggleProfileMenu}
            className={[
              cssModule.profileSection,
              this.state.profileMenuIsActive ? 'active' : ''
            ].join(' ')}
          >
            <div
              style={{
                backgroundImage: `url(${
                  this.props.avatar ? this.props.avatar : defaultAvatar
                })`
              }}
              className={[cssModule.avatar].join(' ')}
            />
            <div className={cssModule.profile}>{this.props.displayName}</div>
            <div
              style={{ display: this.state.profileMenuIsActive ? '' : 'none' }}
              className={cssModule.profileMenu}
            >
              <div className={cssModule.menuItems}>
                <NavLink className={cssModule.menuItem} exact to="/profile">
                  Profilo
                </NavLink>
                <div
                  className={cssModule.menuItem}
                  onClick={this.props.onLogout}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
          {/* <span>

          </span> */}
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
      <AuthenticatedContext.Provider value={orderer}>
        {navbar}
        {orderer ? (
          <MessageBar status="success">
            Colazione già ordinata da {orderer.displayName} ({orderer.email})
            alle {getOrderHHSS(orderer.timestamp)}{' '}
          </MessageBar>
        ) : (
          <MessageBar status="info">{REACT_APP_INFO}</MessageBar>
        )}

        <div className={cssModule.layout}>
          <div>
            <Router>
              <Switch>
                <Route path="/dailyorder" component={CollectiveOrders} />
                <Route path="/myorder" component={MyOrders} />
                <Route path="/profile" component={Profile} />
                <Route path="/order" exact component={Order} />
                <Route path="/chat" exact component={Chat} />
                <Route path="/" exact component={Order} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>
        </div>
      </AuthenticatedContext.Provider>
    );
    return (
      <>
        <Toolbar
          onToggle={this.toggleToolbar}
          isOpen={this.state.toolbarIsOpen}
        />
        <div className={cssModule.commonArea}>
          <>
            {this.props.emailVerified
              ? emailVerifiedFragment
              : emailNotVerifiedFragment}
          </>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  displayName: state.auth.user.displayName,
  emailVerified: state.auth.user.emailVerified,
  email: state.auth.user.email,
  avatar: state.auth.user.photoURL
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logoutFlow()),
    onOrdersChange: resp => dispatch(retrieveOrdersWithSuccess(resp))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedArea);
