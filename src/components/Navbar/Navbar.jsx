import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSearch, FiUser } from 'react-icons/fi';
import { FaBookOpen } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { searchProducts } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/#categories', label: 'Categories' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
          <FaBookOpen size={28} className="navbar-logo-icon" />
          <span className="navbar-logo-text">BookStore</span>
        </Link>

        <nav className="navbar-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar-link ${isActive ? 'navbar-link-active' : ''}`}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className="navbar-icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>

          {isAuthenticated ? (
            <div className="navbar-user-menu">
              <button className="navbar-user-btn">
                <FiUser size={18} />
                <span>{user?.username || user?.name || 'Account'}</span>
              </button>
              <NavLink to="/profile" className="navbar-signin">Profile</NavLink>
              <button className="navbar-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth-buttons">
              <NavLink to="/login" className="navbar-signin">
                Sign In
              </NavLink>
              <NavLink to="/signup" className="navbar-signup">
                Sign Up
              </NavLink>
            </div>
          )}

          <button
            className="navbar-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="navbar-search-dropdown">
          <div className="container">
            <SearchBar
              onSearch={(q) => {
                searchProducts(q);
                navigate('/');
                setSearchOpen(false);
              }}
              placeholder="Search books, authors, categories..."
            />
          </div>
        </div>
      )}

      <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <nav className="navbar-mobile-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar-mobile-link ${isActive ? 'mobile-link-active' : ''}`}
              end={link.to === '/'}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="navbar-mobile-divider" />
          {isAuthenticated ? (
            <>
              <div className="navbar-mobile-user">
                <FiUser size={18} />
                <span>{user?.username || user?.name || 'Account'}</span>
              </div>
              <NavLink to="/profile" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </NavLink>
              <button className="navbar-mobile-link navbar-mobile-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="navbar-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="navbar-mobile-link navbar-mobile-signup"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
