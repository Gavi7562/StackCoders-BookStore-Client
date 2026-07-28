import { useState } from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const [ripple, setRipple] = useState(null);

  const handleClick = (e) => {
    if (disabled || loading) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipple({ x, y, id: Date.now() });
    setTimeout(() => setRipple(null), 600);

    if (onClick) onClick(e);
  };

  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
    loading ? 'btn-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <span className="btn-spinner" />
      )}
      <span className={`btn-content ${loading ? 'btn-content-hidden' : ''}`}>
        {children}
      </span>
      {ripple && (
        <span
          className="btn-ripple"
          style={{ left: ripple.x, top: ripple.y }}
          key={ripple.id}
        />
      )}
    </button>
  );
};

export default Button;
