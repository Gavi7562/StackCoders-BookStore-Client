import { useState } from 'react';
import Button from '../Button/Button';
import './BookCard.css';

const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
}).format(Number(price ?? 0));

const BookCard = ({ book }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const title = book.bookName ?? book.title ?? 'Untitled Book';
  const categoryName = book.category?.categoryName ?? book.category ?? 'Uncategorized';
  const inStock = Number(book.stock ?? 0) > 0;
  const createdDate = book.createdDate ? new Date(book.createdDate).toLocaleDateString('en-IN') : 'Not available';
  const coverImage = book.imageUrl ?? book.imageUrls?.[0];

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
        <span className={`book-card-badge ${inStock ? 'badge-new' : 'badge-sale'}`}>
          {inStock ? 'In Stock' : 'Out Of Stock'}
        </span>
      </div>
      <div className="book-card-body">
        <p className="book-card-category">{categoryName}</p>
        <h4 className="book-card-title">{title}</h4>
        <p className="book-card-author">by {book.author ?? 'Unknown Author'}</p>
        <p className="book-card-description">{book.description ?? 'No description available.'}</p>
        <dl className="book-card-summary">
          <div><dt>Product ID</dt><dd>{book.productId}</dd></div>
          <div><dt>Stock</dt><dd>{inStock ? `${book.stock} available` : 'Out Of Stock'}</dd></div>
        </dl>
        <div className="book-card-footer">
          <div className="book-card-price">
            <span className="price-current">{formatPrice(book.price)}</span>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setDetailsOpen((open) => !open)}>
            {detailsOpen ? 'Hide Details' : 'View Details'}
          </Button>
        </div>
        {detailsOpen && (
          <dl className="book-card-details">
            <div><dt>Created</dt><dd>{createdDate}</dd></div>
            <div><dt>Images</dt><dd>{book.imageUrls?.length ?? (coverImage ? 1 : 0)}</dd></div>
          </dl>
        )}
      </div>
    </article>
  );
};

export default BookCard;
