import BookCard from '../BookCard/BookCard';
import './BookGrid.css';

const BookGrid = ({ books, title }) => {
  return (
    <section className="book-grid-section">
      {title && (
        <div className="book-grid-header">
          <h2 className="book-grid-title">{title}</h2>
        </div>
      )}
      <div className="book-grid">
        {books.map((book, index) => (
          <div key={book.productId || book.id || index} className="book-grid-item" style={{ animationDelay: `${index * 0.05}s` }}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookGrid;
