import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

// common button component
const Button = ({ className, label, onClick, primary, disabled }) => (
    <button className={`button ${className} ${primary ? 'primary' : ''}`} disabled={disabled} onClick={onClick}>{label}</button>
);

Button.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    primary: PropTypes.bool,
    disabled: PropTypes.bool
};

Button.defaultProps = {
    className: '',
    primary: false,
    disabled: false
};

export default Button;
