import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const [adminUser, setAdminUser] = useState(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            if (localStorage.getItem('userRole') === 'ADMIN' || localStorage.getItem('userRole') === 'ROLE_ADMIN') {
                return parsed;
            }
        }
        return null;
    });
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
        return Boolean(localStorage.getItem('accessToken') && (localStorage.getItem('userRole') === 'ADMIN' || localStorage.getItem('userRole') === 'ROLE_ADMIN'));
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const clearAuthData = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('refreshToken');
    };

    const loadAdminUser = async () => {
        if (!localStorage.getItem('accessToken')) {
            clearAuthData();
            setIsAdminAuthenticated(false);
            setLoading(false);
            return;
        }
        try {
            const response = await authService.getCurrentUser();
            const user = response.data ?? response;
            if (user?.role === 'ADMIN' || user?.role === 'ROLE_ADMIN') {
                setAdminUser(user);
                setIsAdminAuthenticated(true);
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id || user.userId,
                    username: user.username,
                    email: user.email
                }));
                localStorage.setItem('userRole', user.role);
            } else {
                setIsAdminAuthenticated(false);
            }
        } catch {
            setIsAdminAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAdminUser();
    }, []);

    const adminLogin = async (email, password) => {
        setLoading(true);
        setError('');
        try {
            const response = await authService.adminLogin(email, password);
            const payload = response.data;
            const accessToken = payload?.accessToken ?? payload?.token;

            const user = payload?.user ?? payload?.authUserSummary ?? null;
            if (user?.role === 'ADMIN' || user?.role === 'ROLE_ADMIN') {
                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('loginTime', new Date().toISOString());
                }
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id || user.userId,
                    username: user.username,
                    email: user.email
                }));
                localStorage.setItem('userRole', user.role);

                setAdminUser(user);
                setIsAdminAuthenticated(true);
                return { success: true };
            } else {
                throw new Error('Access Denied');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
            return { success: false, message: err.message || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    const adminLogout = async () => {
        setLoading(true);
        try {
            if (localStorage.getItem('accessToken')) {
                await authService.logout();
            }
        } catch (err) {
            console.warn("Logout API call failed, but clearing local session", err);
        } finally {
            clearAuthData();
            setAdminUser(null);
            setIsAdminAuthenticated(false);
            setLoading(false);
            window.location.href = '/admin';
        }
    };

    const value = useMemo(() => ({
        adminUser,
        isAdminAuthenticated,
        loading,
        error,
        adminLogin,
        adminLogout,
        loadAdminUser,
    }), [adminUser, isAdminAuthenticated, loading, error]);

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
