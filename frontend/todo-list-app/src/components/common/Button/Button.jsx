import PropTypes from 'prop-types';
import styles from './Button.module.css';
import { COLORS } from '../../../utils/constants';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
}) => {
  const styleVars = {
    '--primary': COLORS.primary,
    '--primaryHover': COLORS.primaryHover,
    '--secondary': COLORS.secondary,
    '--secondaryHover': COLORS.secondaryHover,
    '--danger': COLORS.danger,
    '--dangerHover': COLORS.dangerHover,
    '--white': COLORS.white,
    '--textDark': COLORS.textDark,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
      style={styleVars}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  disabled: PropTypes.bool,
};

export default Button;
