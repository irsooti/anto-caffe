import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Order from '../Order/Order';
class AuthenticatedArea extends Component {
  render() {
    return (
      <>
        <nav className="nav default">
          <NavLink className="nav-item" exact to="/asd">
            Gli ordini di oggi
          </NavLink>
          <NavLink className="nav-item" exact to="/">
            Ordina
          </NavLink>
        </nav>
        <div
          className="container"
          style={{ maxWidth: '1200px', margin: 'auto' }}
        >
          <Order />
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
