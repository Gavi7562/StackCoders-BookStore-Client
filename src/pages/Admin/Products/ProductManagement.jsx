import { useState, useEffect } from 'react';
import api from '../../../services/api';
import './ProductManagement.css';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/products');
            setProducts(response.data?.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/admin/products/${id}`);
                setProducts(products.filter(p => p.productId !== id));
                alert('Product deleted successfully');
            } catch (err) {
                alert('Failed to delete product');
                console.error(err);
            }
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const handleModalSave = (savedProduct, isNew) => {
        if (isNew) {
            setProducts([...products, savedProduct]);
        } else {
            setProducts(products.map(p => p.productId === savedProduct.productId ? savedProduct : p));
        }
        setIsModalOpen(false);
    };

    const filteredProducts = products.filter(p =>
        p.bookName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.productId?.toString().includes(searchTerm)
    );

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="product-management">
            <div className="pm-header">
                <h3>Product Management</h3>
                <button className="add-btn" onClick={handleAdd}>
                    <MdAdd /> Add Product
                </button>
            </div>

            <div className="pm-controls">
                <input
                    type="text"
                    placeholder="Search by product ID, name, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {loading ? (
                <div>Loading products...</div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.map(product => (
                                    <tr key={product.productId}>
                                        <td>{product.bookName}</td>
                                        <td>{product.author}</td>
                                        <td>{product.category?.categoryName || 'N/A'}</td>
                                        <td>${product.price?.toFixed(2)}</td>
                                        <td>
                                            <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-btns">
                                                <button className="edit-btn" onClick={() => handleEdit(product)}><MdEdit /></button>
                                                <button className="del-btn" onClick={() => handleDelete(product.productId)}><MdDelete /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {paginatedProducts.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(c => c - 1)}
                            >
                                Prev
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(c => c + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {isModalOpen && (
                <ProductFormModal
                    product={currentProduct}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleModalSave}
                />
            )}
        </div>
    );
};

const ProductFormModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        bookName: product?.bookName || '',
        author: product?.author || '',
        description: product?.description || '',
        price: product?.price || '',
        stock: product?.stock || '',
        categoryId: product?.category?.categoryId || '',
        imageUrl: product?.imageUrl || ''
    });
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        api.get('/categories').then(res => {
            setCategories(res.data?.data || []);
        }).catch(console.error);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock, 10),
                categoryId: parseInt(formData.categoryId, 10)
            };

            if (product) {
                const res = await api.put(`/admin/products/${product.productId}`, payload);
                onSave(res.data.data, false);
            } else {
                const res = await api.post('/admin/products', payload);
                onSave(res.data.data, true);
                alert('Product added successfully!');
            }
        } catch (err) {
            alert('Failed to save product');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>{product ? 'Edit Product' : 'Add Product'}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Book Name *</label>
                        <input type="text" name="bookName" value={formData.bookName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Author *</label>
                        <input type="text" name="author" value={formData.author} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Category *</label>
                        <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                            <option value="">Select Category</option>
                            {categories.map(c => (
                                <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description *</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group half">
                            <label>Price ($) *</label>
                            <input type="number" step="0.01" min="0.01" name="price" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="form-group half">
                            <label>Stock Quantity *</label>
                            <input type="number" min="0" name="stock" value={formData.stock} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose} disabled={saving}>Cancel</button>
                        <button type="submit" className="save-btn" disabled={saving}>{saving ? 'Saving...' : 'Save Product'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductManagement;
