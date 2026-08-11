import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import Button from '../components/Button/Button';
import './Profile.css';

const Profile = () => {
  const { user, loading, error, updateUserLocal, logout } = useAuth();

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const displayMessage = (msg, isError = false) => {
    isError ? setErrorMsg(msg) : setMessage(msg);
    setTimeout(() => {
      setMessage('');
      setErrorMsg('');
    }, 4000);
  };

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      const res = await userService.updateUsername(username);
      updateUserLocal(res.data);
      displayMessage(res.message || 'Username updated successfully');
    } catch (err) {
      displayMessage(err.response?.data?.message || 'Failed to update username', true);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      const res = await userService.updateEmail(email);
      updateUserLocal(res.data);
      displayMessage(res.message || 'Email updated successfully');
    } catch (err) {
      displayMessage(err.response?.data?.message || 'Failed to update email', true);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      displayMessage("Passwords do not match", true);
      return;
    }
    try {
      setUpdateLoading(true);
      const res = await userService.changePassword(currentPassword, newPassword, confirmPassword);
      displayMessage(res.message || 'Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      logout(); // Force login after password change as requested
    } catch (err) {
      displayMessage(err.response?.data?.message || 'Failed to change password', true);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <div className="container" style={{ marginTop: '5rem' }}>Loading profile...</div>;
  if (error || !user) return <div className="container" style={{ marginTop: '5rem' }}>{error || 'User not found'}</div>;

  return (
    <main className="profile-page">
      <div className="container profile-container">
        <h1 className="profile-title">Profile Settings</h1>

        {message && <div className="profile-alert success">{message}</div>}
        {errorMsg && <div className="profile-alert error">{errorMsg}</div>}

        <div className="profile-grid">

          <section className="profile-section">
            <h2>Profile Information</h2>
            <div className="profile-info-row"><span>Role</span><strong>{user.role}</strong></div>
            <div className="profile-info-row"><span>Joined</span><strong>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</strong></div>
          </section>

          <section className="profile-section">
            <h2>Update Username</h2>
            <form onSubmit={handleUpdateUsername}>
              <div className="form-group">
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required minLength={3} className="profile-input" placeholder="New Username" />
              </div>
              <Button type="submit" disabled={updateLoading || username === user.username}>Save Username</Button>
            </form>
          </section>

          <section className="profile-section">
            <h2>Update Email</h2>
            <form onSubmit={handleUpdateEmail}>
              <div className="form-group">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="profile-input" placeholder="New Email" />
              </div>
              <Button type="submit" disabled={updateLoading || email === user.email}>Save Email</Button>
            </form>
          </section>

          <section className="profile-section">
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="profile-input" placeholder="Current Password" />
              </div>
              <div className="form-group">
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6} className="profile-input" placeholder="New Password" />
              </div>
              <div className="form-group">
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required minLength={6} className="profile-input" placeholder="Confirm New Password" />
              </div>
              <Button type="submit" disabled={updateLoading || !currentPassword || !newPassword || !confirmPassword}>Update Password</Button>
            </form>
          </section>

          <section className="profile-section danger-zone">
            <h2>Account Actions</h2>
            <Button variant="danger" onClick={logout}>Sign Out</Button>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;
