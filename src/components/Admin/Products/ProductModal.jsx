import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import adminProductService from '../../../services/adminProductService';

const ProductModal = ({ isOpen, onClose, product, categories, onSave }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            bookName: '',
            author: '',
            description: '',
            price: '',
            stock: '',
            categoryId: ''
        }
    });

    useEffect(() => {
        if (product) {
            reset({
                bookName: product.bookName,
                author: product.author,
                description: product.description,
                price: product.price,
                stock: product.stock,
                categoryId: product.category?.categoryId || ''
            });
            if (product.imageUrl) {
                setImageUrl(product.imageUrl);
            } else {
                setImageUrl('');
            }
        } else {
            reset();
            setImageUrl('');
        }
    }, [product, reset]);

    const onSubmit = async (data) => {
        if (!imageUrl) {
            toast.error('Book Cover Image is required');
            return;
        }

        setIsSubmitting(true);
        const payload = {
            ...data,
            imageUrl: imageUrl
        };

        try {
            if (product) {
                await adminProductService.updateProduct(product.productId, payload);
                toast.success('Product updated successfully');
            } else {
                await adminProductService.createProduct(payload);
                toast.success('Product created successfully');
            }
            onSave();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content product-form-modal">
                <div className="modal-header">
                    <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button className="close-btn" onClick={onClose}><i className="fas fa-times"></i></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="product-form">
                    <div className="form-grid">
                        <div className="form-left-col">
                            <div className="form-group">
                                <label>Book Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    {...register('bookName', { required: 'Book Name is required' })}
                                    className={errors.bookName ? 'error' : ''}
                                />
                                {errors.bookName && <span className="error-message">{errors.bookName.message}</span>}
                            </div>

                            <div className="form-group">
                                <label>Author <span className="required">*</span></label>
                                <input
                                    type="text"
                                    {...register('author', { required: 'Author is required' })}
                                    className={errors.author ? 'error' : ''}
                                />
                                {errors.author && <span className="error-message">{errors.author.message}</span>}
                            </div>

                            <div className="form-group">
                                <label>Category <span className="required">*</span></label>
                                <select
                                    {...register('categoryId', { required: 'Category is required' })}
                                    className={errors.categoryId ? 'error' : ''}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                                    ))}
                                </select>
                                {errors.categoryId && <span className="error-message">{errors.categoryId.message}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Price (₹) <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        {...register('price', {
                                            required: 'Price is required',
                                            min: { value: 0.01, message: 'Price must be greater than 0' }
                                        })}
                                        className={errors.price ? 'error' : ''}
                                    />
                                    {errors.price && <span className="error-message">{errors.price.message}</span>}
                                </div>

                                <div className="form-group half">
                                    <label>Stock Quantity <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        {...register('stock', {
                                            required: 'Stock is required',
                                            min: { value: 0, message: 'Stock cannot be negative' }
                                        })}
                                        className={errors.stock ? 'error' : ''}
                                    />
                                    {errors.stock && <span className="error-message">{errors.stock.message}</span>}
                                </div>
                            </div>

                            <div className="form-group full">
                                <label>Description <span className="required">*</span></label>
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    rows="4"
                                    className={errors.description ? 'error' : ''}
                                ></textarea>
                                {errors.description && <span className="error-message">{errors.description.message}</span>}
                            </div>
                        </div>

                        <div className="form-right-col">
                            <div className="form-group image-upload-group">
                                <label>Book Cover Image URL <span className="required">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter image URL"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="image-url-input"
                                />
                                {imageUrl && (
                                    <div className="image-preview" style={{ marginTop: '10px' }}>
                                        <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <><i className="fas fa-spinner fa-spin"></i> Saving...</>
                            ) : (
                                <><i className="fas fa-save"></i> Save Product</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
