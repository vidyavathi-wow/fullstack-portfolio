import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = ({ value, onChange, placeholder = "", type = "text", disabled = false }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={styles.input}
      disabled={disabled}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
