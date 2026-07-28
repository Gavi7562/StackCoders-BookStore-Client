import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import './NotFound.css';

const NotFound = () => {
  return (
    <main className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-text">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="not-found-btn">
            <FiHome size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
