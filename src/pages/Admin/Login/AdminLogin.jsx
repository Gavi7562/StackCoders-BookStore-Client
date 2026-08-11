import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../context/AdminContext';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { adminLogin, isAdminAuthenticated, loading, error } = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdminAuthenticated) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [isAdminAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        const result = await adminLogin(email, password);
        if (result.success) {
            navigate('/admin/dashboard', { replace: true });
        }
    };

    if (isAdminAuthenticated) return null; // Prevent flicker before redirect

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <h2>Admin Portal</h2>
                    <p>Login to access the dashboard</p>
                </div>

                {error && <div className="admin-login-error">{error}</div>}

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@stackcoders.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="admin-login-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
