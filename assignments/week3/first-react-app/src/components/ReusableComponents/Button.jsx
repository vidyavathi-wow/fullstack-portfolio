import PropTypes from "prop-types";




const Button = ({ label, onClick, type, disabled }) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
};


// Button.defaultProps = {
//   type: "button",
//   disabled: false,
//   onClick: () => {},
// };

export default Button;