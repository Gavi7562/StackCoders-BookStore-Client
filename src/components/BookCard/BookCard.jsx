import { FiStar } from 'react-icons/fi';
import Button from '../Button/Button';
import './BookCard.css';

const BookCard = ({ book }) => {

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}
        fill={i < Math.floor(rating) ? '#F59E0B' : 'none'}
      />
    ));
  };

  return (
    <div className="book-card">
      <div className="book-card-image-wrapper">
        <div
          className="book-card-placeholder"
          style={{ backgroundColor: book.color || '#E8F5E9' }}
        >
          <span className="book-card-placeholder-icon">
            {book.title ? book.title.charAt(0) : 'B'}
          </span>
        </div>
        {book.badge && (
          <span className={`book-card-badge badge-${book.badgeType || 'new'}`}>
            {book.badge}
          </span>
        )}
      </div>
      <div className="book-card-body">
        <p className="book-card-category">{book.category || 'Fiction'}</p>
        <h4 className="book-card-title">{book.title}</h4>
        <p className="book-card-author">by {book.author}</p>
        <div className="book-card-rating">
          <div className="stars">{renderStars(book.rating || 4)}</div>
          <span className="rating-count">({book.ratingCount || 0})</span>
        </div>
        <div className="book-card-footer">
            {/* this section will adding the book price in feture */}
          {/* <div className="book-card-price">
            <span className="price-current">{book.price?.toFixed(2) || '0.00'}</span>
            {book.originalPrice && (
              <span className="price-original">${book.originalPrice.toFixed(2)}</span>
            )}
          </div> */}
          <Button variant="secondary" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
