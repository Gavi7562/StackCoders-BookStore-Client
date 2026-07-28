import { Link } from 'react-router-dom';
import { FiBookOpen, FiTarget, FiHeart, FiUsers, FiAward, FiGlobe } from 'react-icons/fi';
import './About.css';

const About = () => {
  const values = [
    { icon: FiHeart, title: 'Passion for Reading', description: 'We believe books have the power to transform lives and open new worlds.' },
    { icon: FiTarget, title: 'Curated Quality', description: 'Every book in our collection is carefully selected to ensure the best reading experience.' },
    { icon: FiUsers, title: 'Community First', description: 'Building a global community of readers who share knowledge and stories.' },
    { icon: FiAward, title: 'Excellence', description: 'We strive for excellence in everything from curation to customer service.' },
  ];

  const stats = [
    { number: '10,000+', label: 'Books Available' },
    { number: '500+', label: 'Authors' },
    { number: '50,000+', label: 'Happy Readers' },
    { number: '100+', label: 'Categories' },
  ];

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <FiBookOpen size={32} className="about-hero-icon" />
            <h1 className="about-hero-title">About BookStore</h1>
            <p className="about-hero-text">
              We're on a mission to connect readers with books that inspire, educate, and transform.
              Founded in 2024, BookStore has grown from a small passion project into a thriving
              community of book lovers.
            </p>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="about-stat-card">
                <span className="about-stat-number">{stat.number}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-content">
              <h2 className="about-section-title">Our Story</h2>
              <p className="about-story-text">
                BookStore started with a simple idea: make it easier for people to discover books
                they'll love. We noticed that while there were many places to buy books, finding the
                right one was often overwhelming.
              </p>
              <p className="about-story-text">
                Our team of avid readers and technology enthusiasts came together to create a platform
                that combines the joy of browsing a bookstore with the convenience of online shopping.
                Today, we serve thousands of readers worldwide, helping them find their next favorite book.
              </p>
            </div>
            <div className="about-story-visual">
              <div className="about-visual-card">
                <FiGlobe size={48} className="about-visual-icon" />
                <h3>Global Reach</h3>
                <p>Serving readers across 50+ countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2 className="about-section-title centered">Our Values</h2>
          <div className="about-values-grid">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="about-value-card">
                  <div className="about-value-icon">
                    <IconComponent size={24} />
                  </div>
                  <h4 className="about-value-title">{value.title}</h4>
                  <p className="about-value-text">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="about-cta-card">
            <h2 className="about-cta-title">Ready to Start Reading?</h2>
            <p className="about-cta-text">Join our community and discover books you'll love.</p>
            <Link to="/signup" className="about-cta-btn">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
