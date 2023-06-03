import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Dashboard from '../dashboard/Dashboard';
const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  return !isAuthenticated ? <Navigate to='/login' /> : <Outlet />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
