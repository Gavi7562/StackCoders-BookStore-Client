import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import productService from '../services/productService';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const runRequest = async (request) => {
    setLoading(true);
    setError('');
    try {
      const response = await request();
      const data = response.data?.products ?? response.data ?? [];
      setProducts(data);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = () => {
    setActiveQuery('');
    return runRequest(productService.getAllProducts);
  };

  const searchProducts = (keyword) => {
    setActiveQuery(keyword);
    return keyword?.trim() ? runRequest(() => productService.searchProducts(keyword)) : fetchProducts();
  };

  const filterProducts = (filters) => runRequest(() => productService.filterProducts(filters));
  const sortProducts = (sortBy) => runRequest(() => productService.sortProducts(sortBy));

  useEffect(() => {
    fetchProducts();
  }, []);

  const groupedProducts = useMemo(() => products.reduce((groups, product) => {
    const categoryName = product.category?.categoryName ?? 'Uncategorized';
    return {
      ...groups,
      [categoryName]: [...(groups[categoryName] ?? []), product],
    };
  }, {}), [products]);

  const authors = useMemo(() => (
    [...new Set(products.map((product) => product.author).filter(Boolean))].sort()
  ), [products]);

  const value = useMemo(() => ({
    products,
    groupedProducts,
    authors,
    loading,
    error,
    activeQuery,
    filtersOpen,
    setFiltersOpen,
    fetchProducts,
    searchProducts,
    filterProducts,
    sortProducts,
  }), [products, groupedProducts, authors, loading, error, activeQuery, filtersOpen]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
