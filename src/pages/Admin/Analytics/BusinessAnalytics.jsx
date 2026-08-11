import { useState, useEffect } from 'react';
import api from '../../../services/api';
import './BusinessAnalytics.css';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    LineChart, Line
} from 'recharts';

const BusinessAnalytics = () => {
    const [activeTab, setActiveTab] = useState('daily');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    // Form states
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const fetchDaily = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/business/daily?date=${date}`);
            setData(res?.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchMonthly = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/business/monthly?month=${month}&year=${year}`);
            setData(res?.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchYearly = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/business/yearly?year=${year}`);
            setData(res?.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchOverall = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/business/overall`);
            setData(res?.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'daily') fetchDaily();
        if (activeTab === 'monthly') fetchMonthly();
        if (activeTab === 'yearly') fetchYearly();
        if (activeTab === 'overall') fetchOverall();
        // eslint-disable-next-line
    }, [activeTab]);

    return (
        <div className="business-analytics">
            <div className="analytics-header">
                <h3>Business Analytics</h3>
            </div>

            <div className="analytics-tabs">
                <button className={activeTab === 'daily' ? 'active' : ''} onClick={() => setActiveTab('daily')}>Daily Analysis</button>
                <button className={activeTab === 'monthly' ? 'active' : ''} onClick={() => setActiveTab('monthly')}>Monthly Analysis</button>
                <button className={activeTab === 'yearly' ? 'active' : ''} onClick={() => setActiveTab('yearly')}>Yearly Analysis</button>
                <button className={activeTab === 'overall' ? 'active' : ''} onClick={() => setActiveTab('overall')}>Overall Analysis</button>
            </div>

            <div className="analytics-controls">
                {activeTab === 'daily' && (
                    <div className="control-group">
                        <label>Select Date:</label>
                        <input type="date" value={date} onChange={e => { setDate(e.target.value); }} />
                        <button onClick={fetchDaily} className="fetch-btn">Update</button>
                    </div>
                )}
                {activeTab === 'monthly' && (
                    <div className="control-group">
                        <label>Select Month:</label>
                        <select value={month} onChange={e => setMonth(e.target.value)}>
                            {[...Array(12).keys()].map(m => (
                                <option key={m + 1} value={m + 1}>{new Date(0, m).toLocaleString('default', { month: 'long' })}</option>
                            ))}
                        </select>
                        <label>Select Year:</label>
                        <input type="number" value={year} onChange={e => setYear(e.target.value)} />
                        <button onClick={fetchMonthly} className="fetch-btn">Update</button>
                    </div>
                )}
                {activeTab === 'yearly' && (
                    <div className="control-group">
                        <label>Select Year:</label>
                        <input type="number" value={year} onChange={e => setYear(e.target.value)} />
                        <button onClick={fetchYearly} className="fetch-btn">Update</button>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="loading-state">Loading actuals...</div>
            ) : data ? (
                <div className="analytics-results">

                    <div className="dashboard-grid">
                        {data.revenue !== undefined && (
                            <div className="stat-card highlight">
                                <h4>Total Revenue</h4>
                                <p className="stat-value">₹{data.revenue?.toFixed(2) || '0.00'}</p>
                            </div>
                        )}
                        {data.orders !== undefined && (
                            <div className="stat-card">
                                <h4>Orders</h4>
                                <p className="stat-value">{data.orders || 0}</p>
                            </div>
                        )}
                        {data.averageOrderValue !== undefined && (
                            <div className="stat-card">
                                <h4>Average Order Value</h4>
                                <p className="stat-value">₹{data.averageOrderValue?.toFixed(2) || '0.00'}</p>
                            </div>
                        )}
                        {data.transactions !== undefined && (
                            <div className="stat-card">
                                <h4>Transactions</h4>
                                <p className="stat-value">{data.transactions || 0}</p>
                            </div>
                        )}
                        {/* Overall Specific */}
                        {data.totalRevenue !== undefined && (
                            <div className="stat-card highlight">
                                <h4>Overall Lifetime Revenue</h4>
                                <p className="stat-value">₹{data.totalRevenue?.toFixed(2) || '0.00'}</p>
                            </div>
                        )}
                        {data.totalOrders !== undefined && (
                            <div className="stat-card">
                                <h4>Total Orders</h4>
                                <p className="stat-value">{data.totalOrders || 0}</p>
                            </div>
                        )}
                        {data.totalUsers !== undefined && (
                            <div className="stat-card">
                                <h4>Total Users</h4>
                                <p className="stat-value">{data.totalUsers || 0}</p>
                            </div>
                        )}
                        {data.totalProducts !== undefined && (
                            <div className="stat-card">
                                <h4>Total Active Products</h4>
                                <p className="stat-value">{data.totalProducts || 0}</p>
                            </div>
                        )}

                        {data.bestSellingCategory && (
                            <div className="stat-card premium-card">
                                <h4>Best Selling Category</h4>
                                <p className="stat-value">{data.bestSellingCategory}</p>
                            </div>
                        )}

                        {data.bestSellingBook && (
                            <div className="stat-card premium-card">
                                <h4>Top Selling Book</h4>
                                <p className="stat-value text-ellipsis" title={data.bestSellingBook}>{data.bestSellingBook}</p>
                            </div>
                        )}

                        {data.growthPercentage !== undefined && data.growthPercentage !== null && (
                            <div className="stat-card">
                                <h4>Growth / Change</h4>
                                <p className={`stat-value ${data.growthPercentage >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {data.growthPercentage > 0 ? '+' : ''}{data.growthPercentage?.toFixed(2)}%
                                </p>
                            </div>
                        )}
                    </div>

                    {data.trends && Object.keys(data.trends).length > 0 && (
                        <div className="chart-container">
                            <h3>Revenue Trends</h3>
                            <div style={{ width: '100%', height: 400, marginTop: '20px' }}>
                                <ResponsiveContainer>
                                    <BarChart data={Object.entries(data.trends).map(([key, val]) => ({ name: key, revenue: val }))}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" tickMargin={10} axisLine={false} tickLine={false} />
                                        <YAxis tickFormatter={(value) => `₹${value}`} axisLine={false} tickLine={false} />
                                        <RechartsTooltip formatter={(value) => [`₹${value}`, 'Revenue']} cursor={{ fill: '#f1f5f9' }} />
                                        <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="no-data">No data available for the selected range.</div>
            )}
        </div>
    );
};

export default BusinessAnalytics;
