import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiShield } from 'react-icons/fi';
import { FaBookOpen } from 'react-icons/fa';
import InputField from '../../InputField/InputField';
import Button from '../../Button/Button';
import { useAuth } from '../../../context/AuthContext';
import {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    getPasswordChecks,
} from '../../../validation/validators';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const { signup, loading } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [formError, setFormError] = useState('');
    const [showPasswordChecks, setShowPasswordChecks] = useState(false);

    const passwordChecks = getPasswordChecks(formData.password);

    const validators = {
        username: validateUsername,
        email: validateEmail,
        password: validatePassword,
        confirmPassword: (val) => validateConfirmPassword(formData.password, val),
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: validators[name](value),
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({
            ...prev,
            [name]: validators[name](value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allTouched = {};
        const allErrors = {};
        Object.keys(formData).forEach((key) => {
            allTouched[key] = true;
            allErrors[key] = validators[key] ? validators[key](formData[key]) : '';
        });
        setTouched(allTouched);
        setErrors(allErrors);

        const hasErrors = Object.values(allErrors).some((err) => err !== '');
        if (hasErrors) return;

        setFormError('');
        const result = await signup({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        });

        if (result?.success) {
            navigate('/login');
        } else {
            setFormError(result?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-visual">
                    <div className="signup-visual-content">
                        <FaBookOpen size={48} className="signup-visual-icon" />
                        <h2 className="signup-visual-title">Join BookStore</h2>
                        <p className="signup-visual-text">
                            Create your account and start exploring thousands of books
                            curated just for you.
                        </p>
                    </div>
                </div>

                <div className="signup-form-wrapper">
                    <div className="signup-form-card">
                        <div className="signup-form-header">
                            <h1 className="signup-title">Sign Up</h1>
                        </div>

                        <form className="signup-form" onSubmit={handleSubmit} noValidate>
                            {formError && (
                                <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', backgroundColor: '#ffebe9', padding: '10px', borderRadius: '4px' }}>
                                    {formError}
                                </div>
                            )}

                            <InputField
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.username}
                                touched={touched.username}
                                placeholder="Enter your full name"
                                icon={FiUser}
                            />

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

                            <div className="signup-password-group">
                                <InputField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={(e) => {
                                        handleBlur(e);
                                        setShowPasswordChecks(false);
                                    }}
                                    onFocus={() => setShowPasswordChecks(true)}
                                    error={errors.password}
                                    touched={touched.password}
                                    placeholder="Create a password"
                                    icon={FiLock}
                                />
                                {/* {showPasswordChecks && formData.password && (
                                    <div className="password-checks">
                                        <div className={`password-check ${passwordChecks?.minLength ? 'check-pass' : ''}`}>
                                            <span className="check-icon">{passwordChecks?.minLength ? '✓' : '✖'}</span>
                                            At least 8 characters
                                        </div>
                                        <div className={`password-check ${passwordChecks?.hasUppercase ? 'check-pass' : ''}`}>
                                            <span className="check-icon">{passwordChecks?.hasUppercase ? '✓' : '✖'}</span>
                                            1 uppercase letter
                                        </div>
                                        <div className={`password-check ${passwordChecks?.hasLowercase ? 'check-pass' : ''}`}>
                                            <span className="check-icon">{passwordChecks?.hasLowercase ? '✓' : '✖'}</span>
                                            1 lowercase letter
                                        </div>
                                        <div className={`password-check ${passwordChecks?.hasNumber ? 'check-pass' : ''}`}>
                                            <span className="check-icon">{passwordChecks?.hasNumber ? '✓' : '✖'}</span>
                                            1 number
                                        </div>
                                        <div className={`password-check ${passwordChecks?.hasSpecial ? 'check-pass' : ''}`}>
                                            <span className="check-icon">{passwordChecks?.hasSpecial ? '✓' : '✖'}</span>
                                            1 special character
                                        </div>
                                    </div>
                                )} */}
                            </div>

                            <InputField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                placeholder="Confirm your password"
                                icon={FiLock}
                       col     />

                            <Button
                               style={{backgroundColor : '#2d9144'}}
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                loading={loading}
                                disabled={loading}
                            >
                                Create Account
                            </Button>
                        </form>

                        <p className="signup-footer-text">
                            Already have an account?{' '}
                            <Link to="/login" className="signup-link">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Signup;
