import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const withAuthentication = WrappedComponent => {
  return class extends React.Component {
    IsNotAuthenticatedFragment = (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    );
    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <React.Fragment>
          {this.props.isAuthenticated ? (
            <WrappedComponent {...this.props} />
          ) : (
            this.IsNotAuthenticatedFragment
          )}
        </React.Fragment>
      );
    }
  };
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({});

export default WrappedComponent =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withAuthentication(WrappedComponent));
