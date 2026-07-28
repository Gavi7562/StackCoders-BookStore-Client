import Hero from '../components/Hero/Hero';
import BookGrid from '../components/BookGrid/BookGrid';
import CategorySection from '../components/CategorySection/CategorySection';
import './Home.css';

const featuredBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 14.99, originalPrice: 19.99, rating: 4.5, ratingCount: 2341, category: 'Fiction', badge: 'Best Seller', badgeType: 'new', color: '#E8F5E9' },
  { id: 2, title: 'Sapiens: A Brief History', author: 'Yuval Noah Harari', price: 16.99, rating: 4.7, ratingCount: 3892, category: 'History', badge: 'Trending', badgeType: 'trending', color: '#E3F2FD' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', price: 15.49, originalPrice: 22.00, rating: 4.8, ratingCount: 5120, category: 'Self Help', badge: 'Sale', badgeType: 'sale', color: '#F3E5F5' },
  { id: 4, title: 'Clean Code', author: 'Robert C. Martin', price: 34.99, rating: 4.6, ratingCount: 1567, category: 'Programming', color: '#FFF3E0' },
  { id: 5, title: 'Steve Jobs', author: 'Walter Isaacson', price: 18.99, rating: 4.4, ratingCount: 2089, category: 'Biography', color: '#E0F2F1' },
  { id: 6, title: 'A Brief History of Time', author: 'Stephen Hawking', price: 13.99, originalPrice: 17.99, rating: 4.5, ratingCount: 3456, category: 'Science', badge: 'New', badgeType: 'new', color: '#EDE7F6' },
  { id: 7, title: 'Design Patterns', author: 'Gang of Four', price: 44.99, rating: 4.3, ratingCount: 987, category: 'Programming', color: '#FCE4EC' },
  { id: 8, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', price: 16.49, rating: 4.6, ratingCount: 2890, category: 'Self Help', badge: 'Best Seller', badgeType: 'new', color: '#FFF8E1' },
];

const bestSellers = [
  { id: 9, title: 'Dune', author: 'Frank Herbert', price: 15.99, rating: 4.8, ratingCount: 6789, category: 'Fiction', badge: 'Best Seller', badgeType: 'new', color: '#FFF8E1' },
  { id: 10, title: 'The Psychology of Money', author: 'Morgan Housel', price: 17.99, rating: 4.7, ratingCount: 4321, category: 'Self Help', color: '#E3F2FD' },
  { id: 11, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', price: 59.99, originalPrice: 79.99, rating: 4.5, ratingCount: 2100, category: 'Programming', badge: 'Sale', badgeType: 'sale', color: '#E8F5E9' },
  { id: 12, title: 'The Alchemist', author: 'Paulo Coelho', price: 12.99, rating: 4.4, ratingCount: 8901, category: 'Fiction', color: '#F3E5F5' },
];

const Home = () => {
  return (
    <main className="home-page">
      <Hero />

      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Books</h2>
              <p className="section-subtitle">Handpicked favorites for every reader</p>
            </div>
          </div>
          <BookGrid books={featuredBooks} />
        </div>
      </section>

      <CategorySection />

      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Best Sellers</h2>
              <p className="section-subtitle">Most loved by our community</p>
            </div>
          </div>
          <BookGrid books={bestSellers} />
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h2 className="newsletter-title">Stay in the Loop</h2>
              <p className="newsletter-text">
                Get the latest book recommendations, new arrivals, and exclusive offers
                delivered straight to your inbox.
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
              <p className="newsletter-disclaimer">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
