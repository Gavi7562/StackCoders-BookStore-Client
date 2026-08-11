import React from 'react';

const FilterPanel = ({ categories, filters, onFilterChange }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div className="filter-panel">
            <div className="filter-group">
                <label>Category</label>
                <select name="category" value={filters.category} onChange={handleChange}>
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryName}>
                            {cat.categoryName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Author</label>
                <input
                    type="text"
                    name="author"
                    placeholder="Filter by author..."
                    value={filters.author}
                    onChange={handleChange}
                />
            </div>

            <div className="filter-group">
                <label>Min Price (₹)</label>
                <input
                    type="number"
                    name="minPrice"
                    placeholder="0"
                    min="0"
                    value={filters.minPrice}
                    onChange={handleChange}
                />
            </div>

            <div className="filter-group">
                <label>Max Price (₹)</label>
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    min="0"
                    value={filters.maxPrice}
                    onChange={handleChange}
                />
            </div>

            <div className="filter-group">
                <label>Availability</label>
                <select name="availability" value={filters.availability} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Sort By</label>
                <select name="sort" value={filters.sort} onChange={handleChange}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="nameAsc">Name: A-Z</option>
                    <option value="nameDesc">Name: Z-A</option>
                </select>
            </div>

            <button
                className="reset-filters-btn"
                onClick={() => onFilterChange({
                    category: '', author: '', minPrice: '', maxPrice: '', availability: '', sort: 'newest'
                })}
            >
                Reset Filters
            </button>
        </div>
    );
};

export default FilterPanel;
