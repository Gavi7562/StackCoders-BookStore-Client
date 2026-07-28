import { FiBookOpen, FiCode, FiCpu, FiGlobe, FiHeart, FiUser, FiZap, FiAward } from 'react-icons/fi';
import './CategorySection.css';

const categories = [
  { name: 'Fiction', icon: FiBookOpen, count: 245, color: '#E8F5E9' },
  { name: 'Technology', icon: FiCode, count: 189, color: '#E3F2FD' },
  // { name: 'Science', icon: FiCpu, count: 156, color: '#FFF3E0' },
  // { name: 'History', icon: FiGlobe, count: 132, color: '#F3E5F5' },
  // { name: 'Self Help', icon: FiHeart, count: 198, color: '#FCE4EC' },
  // { name: 'Biography', icon: FiUser, count: 87, color: '#E0F2F1' },
  // { name: 'Programming', icon: FiZap, count: 312, color: '#EDE7F6' },
  { name: 'Best Sellers', icon: FiAward, count: 95, color: '#FFF8E1' },
];

const CategorySection = () => {
  return (
    <section className="category-section">
      <div className="container">
        <div className="category-header">
          <h2 className="category-title">Browse Categories</h2>
          <p className="category-subtitle">Find your next read by topic</p>
        </div>
        <div className="category-grid">
          {categories.map((cat, index) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.name}
                className="category-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="category-icon" style={{ backgroundColor: cat.color }}>
                  <IconComponent size={24} color="var(--color-primary)" />
                </div>
                <h4 className="category-name">{cat.name}</h4>
                <p className="category-count">{cat.count} books</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
