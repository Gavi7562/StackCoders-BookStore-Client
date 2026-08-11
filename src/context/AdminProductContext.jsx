import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import adminProductService from '../services/adminProductService';
import { toast } from 'react-toastify';

const AdminProductContext = createContext(null);

export const AdminProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        author: '',
        minPrice: '',
        maxPrice: '',
        availability: '',
        sort: 'newest'
    });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = { page, size, search, ...filters };
            const response = await adminProductService.getProducts(params);
            if (response?.success) {
                setProducts(response.data?.content || []);
                setTotalPages(response.data?.totalPages || 1);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await adminProductService.getCategories();
            if (response?.success) {
                setCategories(response.data || []);
            }
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, size, search, filters]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSearch = (keyword) => {
        setSearch(keyword);
        setPage(1);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            const response = await adminProductService.deleteProduct(id);
            if (response?.success) {
                toast.success('Product deleted successfully');
                if (products.length === 1 && page > 1) {
                    setPage(page - 1);
                } else {
                    fetchProducts();
                }
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete product');
        } finally {
            setLoading(false);
        }
        return false;
    };

    const value = useMemo(() => ({
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
    }), [products, categories, loading, page, totalPages, search, filters]);

    return <AdminProductContext.Provider value={value}>{children}</AdminProductContext.Provider>;
};

export const useAdminProducts = () => {
    const context = useContext(AdminProductContext);
    if (!context) {
        throw new Error('useAdminProducts must be used within an AdminProductProvider');
    }
    return context;
};
