import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

const Button = ({ className, label, onClick, primary }) => (
    <button className={`button ${className} ${primary ? 'primary' : ''}`} onClick={onClick}>{label}</button>
);

Button.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    primary: PropTypes.bool
};

Button.defaultProps = {
    className: '',
    primary: false
};

export default Button;
