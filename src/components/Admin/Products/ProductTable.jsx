import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
    return (
        <div className="table-responsive">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price (₹)</th>
                        <th>Stock</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.bookName}</td>
                            <td>{product.author}</td>
                            <td>{product.category?.categoryName || 'N/A'}</td>
                            <td>₹{product.price?.toFixed(2)}</td>
                            <td>
                                <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                    {product.stock}
                                </span>
                            </td>
                            <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                            <td>{product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'N/A'}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-btn" onClick={() => onEdit(product)} title="Edit">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="delete-btn" onClick={() => onDelete(product.productId)} title="Delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
