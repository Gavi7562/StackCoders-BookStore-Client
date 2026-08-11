import { NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
    MdDashboard,
    MdInventory,
    MdPeople,
    MdAnalytics,
    MdLogout
} from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => {
    const { adminLogout, adminUser } = useAdmin();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await adminLogout();
        navigate('/admin', { replace: true });
    };

    const menuItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: <MdDashboard /> },
        { path: '/admin/products', name: 'Product Management', icon: <MdInventory /> },
        { path: '/admin/users', name: 'User Management', icon: <MdPeople /> },
        { path: '/admin/analytics', name: 'Business Analytics', icon: <MdAnalytics /> },
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-brand">
                <h2>StackCoders</h2>
                <span>Admin Portal</span>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-text">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="admin-info">
                    <div className="admin-avatar">{adminUser?.username?.charAt(0)?.toUpperCase() || 'A'}</div>
                    <div className="admin-name">{adminUser?.username || 'Admin'}</div>
                </div>
                <button onClick={handleLogout} className="logout-button">
                    <MdLogout className="sidebar-icon" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
