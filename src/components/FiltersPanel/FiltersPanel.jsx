import { useState } from 'react';
import { FiFilter, FiRefreshCcw } from 'react-icons/fi';
import { useCategories } from '../../context/CategoryContext';
import { useProducts } from '../../context/ProductContext';
import './FiltersPanel.css';

const initialFilters = {
  category: '',
  author: '',
  minPrice: '',
  maxPrice: '',
  availability: '',
};

const FiltersPanel = ({ onApplied }) => {
  const [filters, setFilters] = useState(initialFilters);
  const { categories } = useCategories();
  const { authors, filterProducts, fetchProducts } = useProducts();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    filterProducts({
      ...filters,
      availability: filters.availability === '' ? '' : filters.availability === 'true',
    });
    onApplied?.();
  };

  const handleReset = () => {
    setFilters(initialFilters);
    fetchProducts();
    onApplied?.();
  };

  return (
    <aside className="filters-panel">
      <div className="filters-heading">
        <FiFilter size={18} />
        <h3>Filters</h3>
      </div>
      <form className="filters-form" onSubmit={handleSubmit}>
        <label>
          Category
          <select name="category" value={filters.category} onChange={handleChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryName}>{category.categoryName}</option>
            ))}
          </select>
        </label>

        <label>
          Author
          <select name="author" value={filters.author} onChange={handleChange}>
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </label>

        <div className="filters-price-row">
          <label>
            Min Price
            <input name="minPrice" type="number" min="0" value={filters.minPrice} onChange={handleChange} />
          </label>
          <label>
            Max Price
            <input name="maxPrice" type="number" min="0" value={filters.maxPrice} onChange={handleChange} />
          </label>
        </div>

        <label>
          Availability
          <select name="availability" value={filters.availability} onChange={handleChange}>
            <option value="">All Books</option>
            <option value="true">In Stock</option>
            <option value="false">Out Of Stock</option>
          </select>
        </label>

        <button className="filters-apply" type="submit">Apply Filters</button>
        <button className="filters-reset" type="button" onClick={handleReset}>
          <FiRefreshCcw size={16} />
          Reset
        </button>
      </form>
    </aside>
  );
};

export default FiltersPanel;
