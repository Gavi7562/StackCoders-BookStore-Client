import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 2) {
            end = Math.min(totalPages, 5);
        }
        if (currentPage >= totalPages - 1) {
            start = Math.max(1, totalPages - 4);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="pagination">
            <button
                className="page-nav-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <i className="fas fa-chevron-left"></i> Prev
            </button>

            <div className="page-numbers">
                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        className={`page-number-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className="page-nav-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Pagination;
