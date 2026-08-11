import React, { useState, useEffect } from 'react';
import './AdminProductsComponents.css';

const SearchBar = ({ onSearch, initialValue = '' }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== initialValue) {
                onSearch(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, onSearch, initialValue]);

    return (
        <div className="search-bar-container">
            <i className="fas fa-search search-icon"></i>
            <input
                type="text"
                placeholder="Search by Book Name, Author, Category, Description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            {searchTerm && (
                <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                    <i className="fas fa-times"></i>
                </button>
            )}
        </div>
    );
};

export default SearchBar;
