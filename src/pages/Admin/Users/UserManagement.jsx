import { useState, useEffect } from 'react';
import api from '../../../services/api';
import './UserManagement.css';
import { MdEdit, MdDelete } from 'react-icons/md';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/users');
            setUsers(response?.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/admin/users/${userId}`);
                setUsers(users.filter(u => u.id !== userId));
            } catch (err) {
                console.error('Failed to delete user:', err);
                alert('Failed to delete user');
            }
        }
    };

    const handleModalSave = (savedUser) => {
        setUsers(users.map(u => u.id === savedUser.id ? savedUser : u));
        setIsModalOpen(false);
    };

    const filteredUsers = users.filter(u =>
        u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <div className="user-management">
            <div className="um-header">
                <h3>User Management</h3>
            </div>

            <div className="um-controls">
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {loading ? (
                <div>Loading users...</div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Created Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`role-badge ${user.role?.toLowerCase()}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <span className="stock-badge in-stock">Active</span>
                                        </td>
                                        <td>
                                            <span style={{ display: 'flex', gap: '8px' }}>
                                                <button className="edit-btn" onClick={() => handleEdit(user)} title="Edit"><MdEdit /></button>
                                                <button className="delete-btn" onClick={() => handleDelete(user.id)} title="Delete"><MdDelete /></button>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {paginatedUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(c => c - 1)}
                            >
                                Prev
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(c => c + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {isModalOpen && (
                <UserFormModal
                    user={currentUser}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleModalSave}
                />
            )}
        </div>
    );
};

const UserFormModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        role: user?.role || 'USER',
        password: ''
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { ...formData };
            if (!payload.password) {
                delete payload.password; // Do not send empty password
            }

            const res = await api.put(`/admin/users/${user.id}`, payload);
            onSave(res?.data);
            alert('User updated successfully!');
        } catch (err) {
            alert('Failed to update user');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>Edit User: {user.email}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username *</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Role *</label>
                        <select name="role" value={formData.role} onChange={handleChange} required>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>New Password (Optional)</label>
                        <input type="password" name="password" placeholder="Leave blank to keep unchanged" value={formData.password} onChange={handleChange} />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose} disabled={saving}>Cancel</button>
                        <button type="submit" className="save-btn" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserManagement;
