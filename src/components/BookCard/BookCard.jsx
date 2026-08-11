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
  const author = book.author ?? 'Unknown Author';
  const description = book.description ?? 'No description available.';

  const originalPrice = book.originalPrice || null;
  const price = book.price || 0;
  const discountPercentage = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const quantity = book.quantity ?? book.stock ?? 10;

  let stockStatus = { label: "🟢 In Stock", class: "in-stock" };
  if (quantity <= 0) {
    stockStatus = { label: "🔴 Out Of Stock", class: "out-of-stock" };
  } else if (quantity < 5) {
    stockStatus = { label: "🟡 Low Stock", class: "low-stock" };
  }

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(book.productId || book.id, 1);
    } catch (err) {
      alert(err.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="book-card" aria-label={`Book: ${title}`}>
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
        <h4 className="book-card-title" title={title}>{title}</h4>
        <p className="book-card-author" title={author}>By {author}</p>

        <div className="book-card-price-container">
          <span className="price-current">{formatPrice(price)}</span>
          {discountPercentage > 0 && (
            <>
              <span className="price-original">{formatPrice(originalPrice)}</span>
              <span className="price-discount">{discountPercentage}% Off</span>
            </>
          )}
        </div>

        <p className="book-card-description">{description}</p>

        <div className={`book-card-stock ${stockStatus.class}`}>
          {stockStatus.label}
        </div>

        <div className="book-card-footer">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            disabled={loading || quantity <= 0}
            aria-label={`Add ${title} to cart`}
            style={{ width: '100%', color: 'white' }}
          >
            {loading ? 'Adding...' : 'Add To Cart'}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
