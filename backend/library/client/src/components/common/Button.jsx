export default function Button({
  children,
  type = 'button',
  disabled,
  onClick,
  variant = 'primary',
  className = '',
}) {
  const base =
    'px-4 py-2.5 rounded-lg text-white font-medium transition duration-300 disabled:opacity-70';

  const colors =
    variant === 'danger'
      ? 'bg-red-500 hover:bg-red-600'
      : variant === 'warning'
        ? 'bg-yellow-500 hover:bg-yellow-600'
        : 'bg-primary hover:bg-primary-hover';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${colors} ${className}`}
    >
      {children}
    </button>
  );
}
