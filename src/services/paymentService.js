import api from './api';

export const paymentService = {
    createOrder: () => api.post('/api/payment/create-order'),
    verifyPayment: (paymentDetails) => api.post('/api/payment/verify', paymentDetails),
};
