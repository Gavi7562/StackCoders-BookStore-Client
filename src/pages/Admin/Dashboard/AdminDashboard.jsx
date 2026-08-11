import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './AdminDashboard.css';

const MOCK_DATA = {
    todaysRevenue: 1250.50,
    weeklyRevenue: 8400.00,
    monthlyRevenue: 34500.00,
    totalRevenue: 156000.00,
    totalOrders: 1245,
    totalUsers: 850,
    totalProducts: 120,
    outOfStock: 5,
    lowStock: 12,
    recentOrders: [
        { id: 'ORD-001', user: 'john@example.com', amount: 45.00, status: 'SUCCESS' },
        { id: 'ORD-002', user: 'jane@example.com', amount: 120.00, status: 'PENDING' },
        { id: 'ORD-003', user: 'mike@example.com', amount: 35.50, status: 'SUCCESS' },
        { id: 'ORD-004', user: 'sarah@example.com', amount: 89.00, status: 'FAILED' },
        { id: 'ORD-005', user: 'alex@example.com', amount: 210.00, status: 'SUCCESS' }
    ],
    weeklyPieData: [
        { name: 'Monday', value: 400 },
        { name: 'Tuesday', value: 300 },
        { name: 'Wednesday', value: 500 },
        { name: 'Thursday', value: 700 },
        { name: 'Friday', value: 1200 },
        { name: 'Saturday', value: 1800 },
        { name: 'Sunday', value: 1500 }
    ]
};

const COLORS = ['#6B1D2F', '#2C3E50', '#00C49F', '#FFBB28', '#FF8042', '#a05195', '#d45087'];

const AdminDashboard = () => {
    const [data, setData] = useState(MOCK_DATA);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // In actual implementation, we will fetch from api.get('/admin/dashboard')
        // setData(...)
    }, []);

    if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;

    return (
        <div className="admin-dashboard-container">
            <div className="dashboard-grid">
                <div className="stat-card">
                    <h4>Today's Revenue</h4>
                    <p className="stat-value">${data.todaysRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="stat-card">
                    <h4>Weekly Revenue</h4>
                    <p className="stat-value">${data.weeklyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="stat-card">
                    <h4>Monthly Revenue</h4>
                    <p className="stat-value">${data.monthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="stat-card">
                    <h4>Total Revenue</h4>
                    <p className="stat-value">${data.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="stat-card">
                    <h4>Total Orders</h4>
                    <p className="stat-value">{data.totalOrders}</p>
                </div>
                <div className="stat-card">
                    <h4>Total Users</h4>
                    <p className="stat-value">{data.totalUsers}</p>
                </div>
                <div className="stat-card">
                    <h4>Total Products</h4>
                    <p className="stat-value">{data.totalProducts}</p>
                </div>
            </div>

            <div className="dashboard-row">
                <div className="chart-container">
                    <h3>Weekly Business Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data.weeklyPieData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.weeklyPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="inventory-alerts">
                    <h3>Inventory Alerts</h3>
                    <div className="alert-item error">
                        <div className="alert-info">
                            <span className="alert-title">Out of Stock Books</span>
                            <span className="alert-desc">Products with 0 stock</span>
                        </div>
                        <strong className="alert-value">{data.outOfStock}</strong>
                    </div>
                    <div className="alert-item warning">
                        <div className="alert-info">
                            <span className="alert-title">Low Stock Books</span>
                            <span className="alert-desc">Products with less than 10 stock</span>
                        </div>
                        <strong className="alert-value">{data.lowStock}</strong>
                    </div>
                </div>
            </div>

            <div className="recent-orders-container">
                <h3>Recent Orders</h3>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.recentOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user}</td>
                                <td>${order.amount.toFixed(2)}</td>
                                <td>
                                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
