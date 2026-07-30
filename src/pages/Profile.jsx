import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, loading, error } = useAuth();

  return (
    <main className="profile-page">
      <div className="container profile-container">
        <h1 className="profile-title">Profile</h1>
        {loading && <p className="profile-state">Loading profile...</p>}
        {error && <p className="profile-error">{error}</p>}
        {user && (
          <section className="profile-panel">
            <div><span>Username</span><strong>{user.username ?? user.name}</strong></div>
            <div><span>Email</span><strong>{user.email}</strong></div>
            <div><span>Role</span><strong>{user.role}</strong></div>
            <div><span>Account Created</span><strong>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available'}</strong></div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Profile;
