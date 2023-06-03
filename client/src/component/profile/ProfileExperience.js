import React from 'react';
import PropTypes from 'prop-types';

const ProfileExperience = ({ profile: { experience } }) => {
  return experience.map((exp) => {
    return (
      <div>
        <h3 class='text-dark'>{exp.company}</h3>
        <p>
          {exp.from} - {exp.to}
        </p>
        <p>
          <strong>Position: </strong>
          {exp.title}
        </p>
        <p>
          <strong>Description: </strong>
          {exp.description}
        </p>
      </div>
    );
  });
};

ProfileExperience.propTypes = {};

export default ProfileExperience;
