import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './InputField.css';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const isValid = touched && !error && value;
  const hasError = touched && error;

  const fieldClasses = [
    'input-field-wrapper',
    hasError ? 'input-error' : '',
    isValid ? 'input-valid' : '',
    disabled ? 'input-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      )}
      <div className={fieldClasses}>
        {Icon && (
          <span className="input-icon">
            <Icon size={18} />
          </span>
        )}
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`input-field ${Icon ? 'input-field-with-icon' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {hasError && (
        <span className="input-error-message">{error}</span>
      )}
    </div>
  );
};

export default InputField;
