import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../loadingIndicator';

const ErrorMessage = ({ className, loading, hasError, message }) => (
    <div className={`error-container ${className}`}>
        {loading ? <LoadingIndicator /> : null}
        {!loading && hasError && <p>{message}</p>}
    </div>
);

ErrorMessage.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    hasError: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]).isRequired,
    message: PropTypes.string
};

ErrorMessage.defaultProps = {
    className: '',
    message: 'Something went wrong. We are looking into this issue. Please try again after some time.'
};

export default ErrorMessage;
