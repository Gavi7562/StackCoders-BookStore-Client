import { useContext, useState } from 'react';
import Button from '../Button/Button';
import { CartContext } from '../../context/CartContext';
import './BookCard.css';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
}).format(Number(price ?? 0));

const BookCard = ({ book }) => {
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const title = book.bookName ?? book.title ?? 'Untitled Book';
  const coverImage = book.imageUrl ?? book.imageUrls?.[0];

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(book.productId || book.id, 1);
      // Optional: show a toast notification here
    } catch (err) {
      alert(err.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="book-card">
      <div className="book-card-image-wrapper">
        {coverImage ? (
          <img className="book-card-image" src={coverImage} alt={title} loading="lazy" />
        ) : (
          <div className="book-card-placeholder">
            <span className="book-card-placeholder-icon">{title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="book-card-body">
        <h4 className="book-card-title">{title}</h4>
        <p className="book-card-author">by {book.author ?? 'Unknown Author'}</p>
        <p className="book-card-description">{book.description ?? 'No description available.'}</p>
        <div className="book-card-footer">
          <div className="book-card-price">
            <span className="price-current">{formatPrice(book.price)}</span>
          </div>
          <Button variant="primary" size="sm" onClick={handleAddToCart} disabled={loading}>
            {loading ? 'Adding...' : 'Add To Cart'}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
