import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { orderId, amount } = location.state || {};

    if (!orderId) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <div className="success-icon">✓</div>
                <h1>Order Confirmed!</h1>
                <p className="success-message">Payment Successful</p>

                <div className="order-details">
                    <p><span>Order ID:</span> {orderId}</p>
                    <p><span>Amount Paid:</span> ₹{amount}</p>
                </div>

                <p className="delivery-message">
                    Estimated Delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>

                <div className="confirmation-actions">
                    <Button onClick={() => navigate('/')}>Continue Shopping</Button>
                    <Button variant="secondary" onClick={() => navigate('/orders')}>View Orders</Button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
