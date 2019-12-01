import React from 'react';
import PropTypes from 'prop-types';

import './loadingIndicator.css';

// common loading indicator component
const LoadingIndicator = ({ type }) => {
  const html = (
    <React.Fragment>
      <div />
      <div />
      <div />
    </React.Fragment>
  );
  return <div className={`loading-indicator ${type}`}>{html}</div>;
};

LoadingIndicator.defaultProps = {
  type: 'linear'
};

LoadingIndicator.propTypes = {
  type: PropTypes.oneOf(['linear'])
};

export default LoadingIndicator;
