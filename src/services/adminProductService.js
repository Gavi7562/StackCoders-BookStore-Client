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

const adminProductService = {
    getProducts: (params) => api.get(`/admin/products?${buildQuery(params)}`),
    getProductById: (id) => api.get(`/admin/products/${id}`),
    createProduct: (data) => api.post('/admin/products', data),
    updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
    deleteProduct: (id) => api.delete(`/admin/products/${id}`),
    uploadImage: (formData) => api.post('/admin/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getCategories: () => api.get('/categories') // assuming customer categories are accessible
};

export default adminProductService;
