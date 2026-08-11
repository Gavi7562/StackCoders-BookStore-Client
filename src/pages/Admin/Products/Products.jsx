import React, { useState } from 'react';
import './Products.css';
import SearchBar from '../../../components/Admin/Products/SearchBar';
import FilterPanel from '../../../components/Admin/Products/FilterPanel';
import ProductTable from '../../../components/Admin/Products/ProductTable';
import Pagination from '../../../components/Admin/Products/Pagination';
import ProductModal from '../../../components/Admin/Products/ProductModal';
import ConfirmationDialog from '../../../components/Admin/Products/ConfirmationDialog';
import { useAdminProducts, AdminProductProvider } from '../../../context/AdminProductContext';

const ProductsContent = () => {
    const {
        products,
        categories,
        loading,
        page,
        totalPages,
        search,
        filters,
        setPage,
        handleSearch,
        handleFilterChange,
        fetchProducts,
        deleteProduct
    } = useAdminProducts();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState(null);

    const handleOpenAddModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = async () => {
        handleCloseModal();
        fetchProducts();
    };

    const handleOpenDeleteDialog = (id) => {
        setDeletingProductId(id);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        const success = await deleteProduct(deletingProductId);
        if (success) {
            setIsDeleteDialogOpen(false);
            setDeletingProductId(null);
        }
    };

    return (
        <div className="admin-products-container">
            <div className="admin-products-header">
                <h1>Product Management</h1>
                <button className="add-product-btn" onClick={handleOpenAddModal}>
                    <i className="fas fa-plus"></i> Add Product
                </button>
            </div>

            <div className="admin-products-controls">
                <SearchBar onSearch={handleSearch} initialValue={search} />
                <FilterPanel
                    categories={categories}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
            </div>

            <div className="admin-products-content">
                {loading ? (
                    <div className="loading-spinner">Loading products...</div>
                ) : (
                    <>
                        <ProductTable
                            products={products}
                            onEdit={handleOpenEditModal}
                            onDelete={handleOpenDeleteDialog}
                        />

                        {totalPages > 0 && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        )}

                        {products.length === 0 && (
                            <div className="no-products-found">No products found.</div>
                        )}
                    </>
                )}
            </div>

            {isModalOpen && (
                <ProductModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    product={editingProduct}
                    categories={categories}
                    onSave={handleSaveProduct}
                />
            )}

            {isDeleteDialogOpen && (
                <ConfirmationDialog
                    isOpen={isDeleteDialogOpen}
                    message="Are you sure you want to delete this product? This action cannot be undone."
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setIsDeleteDialogOpen(false)}
                />
            )}
        </div>
    );
};

const Products = () => (
    <AdminProductProvider>
        <ProductsContent />
    </AdminProductProvider>
);

export default Products;
