import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your Next
            <span className="hero-title-highlight"> Favorite Book</span>
          </h1>
          <p className="hero-subtitle">
            Explore our curated collection of bestsellers, new arrivals, and timeless classics.
            Your perfect read is just a click away.
          </p>
          <div className="hero-actions">
            <Link to="/#categories" className="hero-btn-primary">
              Browse Books
              <FiArrowRight size={18} />
            </Link>
            <Link to="/new-arrivals" className="hero-btn-secondary">
              New Arrivals
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">10K+</span>
              <span className="hero-stat-label">Books</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">500+</span>
              <span className="hero-stat-label">Authors</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">50K+</span>
              <span className="hero-stat-label">Readers</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-books-stack">
            <div className="hero-book hero-book-1">
              <div className="hero-book-cover" style={{ background: 'linear-gradient(135deg, #2E7D32, #4CAF50)' }}>
                <span>The Great Gatsby</span>
              </div>
            </div>
            <div className="hero-book hero-book-2">
              <div className="hero-book-cover" style={{ background: 'linear-gradient(135deg, #1565C0, #42A5F5)' }}>
                <span>Sapiens</span>
              </div>
            </div>
            <div className="hero-book hero-book-3">
              <div className="hero-book-cover" style={{ background: 'linear-gradient(135deg, #6A1B9A, #AB47BC)' }}>
                <span>Atomic Habits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
