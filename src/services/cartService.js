import api from './api';

export const cartService = {
    getCart: () => api.get('/api/cart'),
    addToCart: (productId, quantity = 1) => api.post('/api/cart', { productId, quantity }),
    updateCartItem: (itemId, quantity) => api.put(`/api/cart/${itemId}`, { quantity }),
    deleteCartItem: (itemId) => api.delete(`/api/cart/${itemId}`),
};
