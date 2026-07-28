import { Link } from 'react-router-dom';
import { FaBookOpen, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <FaBookOpen size={24} className="footer-logo-icon" />
              <span className="footer-logo-text">BookStore</span>
            </Link>
            <p className="footer-description">
              Discover your next favorite book. Curated collections, best sellers, and hidden gems
              waiting for you.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/categories" className="footer-link">Categories</Link>
            </nav>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Support</h4>
            <nav className="footer-nav">
              <Link to="/faq" className="footer-link">FAQ</Link>
              <Link to="/shipping" className="footer-link">Shipping</Link>
              <Link to="/returns" className="footer-link">Returns</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </nav>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <FiMapPin size={16} />
                <span>123 Book Street, Reading City</span>
              </div>
              <div className="footer-contact-item">
                <FiPhone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="footer-contact-item">
                <FiMail size={16} />
                <span>hello@bookstore.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} BookStore. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
