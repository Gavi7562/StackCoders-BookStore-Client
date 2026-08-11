import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const AdminProtectedRoute = () => {
    const { isAdminAuthenticated, loading } = useAdmin();

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#6B1D2F' }}>Loading...</div>;
    }

    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');

    if (token && role !== 'ADMIN' && role !== 'ROLE_ADMIN') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                <h1 style={{ fontSize: '4rem', color: '#dc3545', margin: '0 0 10px 0' }}>403</h1>
                <h2 style={{ margin: '0 0 20px 0' }}>Access Denied</h2>
                <p>You do not have permission to access the admin portal.</p>
                <a href="/" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Return to Home</a>
            </div>
        );
    }

    return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default AdminProtectedRoute;
