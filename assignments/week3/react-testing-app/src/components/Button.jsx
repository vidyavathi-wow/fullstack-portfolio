// src/components/Button.jsx
import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} data-testid="custom-button">
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default Button;
