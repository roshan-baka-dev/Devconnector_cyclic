import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from '../dashboard/Dashboard';
const PrivateRoute = ({
  path,
  element: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  return !isAuthenticated && !loading ? (
    <Navigate to='/login' />
  ) : (
    // <Route path={path} element={<Component />} />
    <Dashboard />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
