import api from './api';

const buildQuery = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  return query.toString();
};

const productService = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
  searchProducts: (keyword) => api.get(`/products/search?${buildQuery({ keyword })}`),
  filterProducts: (filters) => api.get(`/products/filter?${buildQuery(filters)}`),
  sortProducts: (sortBy) => api.get(`/products/sort?${buildQuery({ sortBy })}`),
};

export default productService;
