import { useState, useEffect, useContext, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart, FiFilter } from 'react-icons/fi';
import { FaBookOpen } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useContext(CartContext);
  const { searchProducts, filtersOpen, setFiltersOpen } = useProducts();
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
    { to: '/about', label: 'About' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const getUserName = () => user?.username || user?.name || 'Account';
  const getInitial = () => getUserName().charAt(0).toUpperCase();

  const handleMouseEnterProfile = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setProfileDropdownOpen(true);
  };

  const handleMouseLeaveProfile = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProfileDropdownOpen(false);
    }, 400);
  };

  const getAvatarColor = (name) => {
    const colors = ['#1abc9c', '#3498db', '#9b59b6', '#e67e22', '#e74c3c', '#f1c40f', '#34495e'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
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
          <button className="catalog-filter-toggle" style={{ marginLeft: '4px' }} type="button" onClick={() => {
            navigate('/#categories');
            setFiltersOpen((open) => !open);
          }}>
            {filtersOpen ? 'Hide Filters' : 'Filter Books'}
          </button>
        </nav>

        <div className="navbar-search-inline">
          <SearchBar
            onSearch={(q) => {
              searchProducts(q);
              navigate('/');
            }}
            placeholder="Search books, authors, categories..."
          />
        </div>

        <div className="navbar-actions">

          {isAuthenticated ? (
            <div className="navbar-user-menu">
              <Link to="/cart" className="navbar-cart-icon" title="Cart">
                <FiShoppingCart size={22} />
                {cart?.totalItems > 0 && <span className="cart-badge">{cart.totalItems}</span>}
              </Link>

              <div className="navbar-profile-container" onMouseLeave={handleMouseLeaveProfile}>
                <div
                  className="navbar-avatar"
                  style={{ backgroundColor: getAvatarColor(getUserName()) }}
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  onMouseEnter={handleMouseEnterProfile}
                >
                  {getInitial()}
                </div>
                {profileDropdownOpen && (
                  <div className="navbar-profile-dropdown" onMouseEnter={handleMouseEnterProfile}>
                    <Link to="/profile" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>Profile</Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>Orders</Link>
                    <button className="dropdown-item logout-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
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
                <div
                  className="navbar-avatar-mobile"
                  style={{ backgroundColor: getAvatarColor(getUserName()) }}
                >
                  {getInitial()}
                </div>
                <span>{getUserName()}</span>
              </div>
              <NavLink to="/profile" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </NavLink>
              <NavLink to="/orders" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                Orders
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
