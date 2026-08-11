import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-content">
                <header className="admin-header">
                    <h2>Admin Dashboard</h2>
                </header>
                <main className="admin-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
