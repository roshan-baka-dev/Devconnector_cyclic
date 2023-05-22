import React, { Fragment } from 'react';
import PropTypes, { array } from 'prop-types';
import { connect } from 'react-redux';
const Alert = ({ alerts }) => {
  console.log(alerts);
  return (
    // alerts !== null &&
    // alerts.length > 0 &&
    // alerts.map((alert) => {
    //   // console.log('entered');
    //   // <h1>hemlo</h1>;
    //   <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    //     {alert.msg}
    //   </div>;
    // })
    // <li className='alert alert-danger'>{alerts[0].msg}</li>
    <ul>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <li key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </li>
        ))}
    </ul>
  );
  // console.log(alert.id);
};

Alert.propTypes = { alerts: PropTypes.array.isRequired };

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
