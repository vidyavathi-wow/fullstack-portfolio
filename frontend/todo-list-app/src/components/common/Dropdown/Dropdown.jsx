import PropTypes from "prop-types";
import styles from "./Dropdown.module.css";

const Dropdown = ({ options, value, onChange, placeholder = "Select an option", disabled = false }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.dropdown}
      disabled={disabled}
    >
      <option value="">{placeholder}</option>
      {options.map((opt, index) => (
        <option key={index} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Dropdown;
