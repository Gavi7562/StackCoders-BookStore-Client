import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaBookOpen, FaGoogle, FaGithub } from 'react-icons/fa';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail } from '../../../validation/validators';
import './Login.css';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (touched[name]) {
      if (name === 'email') {
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
      } else if (name === 'password') {
        setErrors((prev) => ({ ...prev, password: value ? '' : 'Password is required.' }));
      }
    }
  }, [touched]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: value ? '' : 'Password is required.' }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = { email: true, password: true };
    const allErrors = {
      email: validateEmail(formData.email),
      password: formData.password ? '' : 'Password is required.',
    };
    setTouched(allTouched);
    setErrors(allErrors);

    if (allErrors.email || allErrors.password) return;

    setFormError('');
    const result = await login(formData.email, formData.password);
    if (result?.success) {
      navigate('/');
    } else {
      setFormError('Invalid credentials. Please give valid credentials.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-visual">
          <div className="login-visual-content">
            <FaBookOpen size={48} className="login-visual-icon" />
            <h2 className="login-visual-title">Welcome Back!</h2>
            <p className="login-visual-text">
              Sign in to continue your reading journey and discover new books.
            </p>
            <div className="login-visual-decoration">
              <div className="login-deco-book login-deco-1" />
              <div className="login-deco-book login-deco-2" />
              <div className="login-deco-book login-deco-3" />
            </div>
          </div>
        </div>

        <div className="login-form-wrapper">
          <div className="login-form-card">
            <div className="login-form-header">
              <h1 className="login-title">Sign In</h1>
              <p className="login-subtitle">Enter your credentials to access your account</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {formError && (
                <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', backgroundColor: '#ffebe9', padding: '10px', borderRadius: '4px' }}>
                  {formError}
                </div>
              )}
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                placeholder="abc@gmail.com"
                icon={FiMail}
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                placeholder="Enter your password"
                icon={FiLock}
              />

              <div className="login-options">
                <label className="login-checkbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-label">Remember me</span>
                </label>
                <Link to="/forgot-password" className="login-forgot">
                  Forgot Password?
                </Link>
              </div>

              <Button
              style={{backgroundColor : '#2d9144'}}
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Sign In
              </Button>
            </form>

            <div className="login-divider">
              <span>or continue with</span>
            </div>

            <div className="login-social-buttons">
              <button className="login-social-btn" disabled>
                <FaGoogle size={18} />
                <span>Google</span>
              </button>
              {/* <button className="login-social-btn" disabled>
                <FaGithub size={18} />
                <span>GitHub</span>
              </button> */}
            </div>
            <p className="login-social-note">Social login coming soon</p>

            <p className="login-footer-text">
              Don't have an account?{' '}
              <Link to="/signup" className="login-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
