import React, { useEffect, useState } from 'react';
import { orderService } from '../../services/orderService';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await orderService.getMyOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="orders-container loading">Loading...</div>;

    return (
        <div className="orders-container">
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.orderId} className="order-card">
                            <div className="order-header">
                                <div>
                                    <h3>Order #{order.orderId}</h3>
                                    <p className="order-date">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="order-status">
                                    <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                                </div>
                            </div>

                            <div className="order-items-bg">
                                {order.items.map(item => (
                                    <div key={item.id} className="order-item-row">
                                        <div className="order-item-info">
                                            {item.imageUrl && <img src={item.imageUrl} alt={item.bookName} className="order-item-image" />}
                                            <div>
                                                <h4>{item.bookName}</h4>
                                                <p>{item.author}</p>
                                            </div>
                                        </div>
                                        <div className="order-item-price-qty">
                                            <p>₹{item.pricePerUnit} x {item.quantity}</p>
                                            <p className="font-semibold">₹{item.totalPrice}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <h3>Total Amount: ₹{order.totalAmount}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
