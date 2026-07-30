import { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import Hero from '../components/Hero/Hero';
import BookGrid from '../components/BookGrid/BookGrid';
import FiltersPanel from '../components/FiltersPanel/FiltersPanel';
import Loader from '../components/Loader/Loader';
import { useProducts } from '../context/ProductContext';
import './Home.css';

const Home = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { products, loading, error, activeQuery } = useProducts();

  return (
    <main className="home-page">
      <Hero />

      <section className="catalog-section" id="categories">
        <div className="container">
          <div className="catalog-toolbar">
            <div>
              <h2 className="section-title">{activeQuery ? `Search results for "${activeQuery}"` : 'Book Catalog'}</h2>
              <p className="section-subtitle">Browse books from the live catalog</p>
            </div>
            <button className="catalog-filter-toggle" type="button" onClick={() => setFiltersOpen((open) => !open)}>
              {filtersOpen ? <FiX size={18} /> : <FiFilter size={18} />}
              {filtersOpen ? 'Hide Filters' : 'Filter Books'}
            </button>
          </div>

          <div className={`catalog-layout ${filtersOpen ? 'filters-visible' : ''}`}>
            {filtersOpen && <FiltersPanel onApplied={() => setFiltersOpen(false)} />}
            <div className="catalog-results">
              {loading && <Loader />}
              {error && <p className="catalog-error">{error}</p>}
              {!loading && !error && products.length === 0 && (
                <p className="catalog-empty">No books found.</p>
              )}
              {!loading && !error && products.length > 0 && (
                <section className="home-section">
                  <div className="section-header">
                    <div>
                      <h3 className="section-title">All Books</h3>
                      <p className="section-subtitle">{products.length} books available</p>
                    </div>
                  </div>
                  <BookGrid books={products} />
                </section>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
