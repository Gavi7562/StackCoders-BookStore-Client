import api from './api';

export const orderService = {
    getMyOrders: () => api.get('/api/orders'),
    getOrderById: (orderId) => api.get(`/api/orders/${orderId}`),
};
