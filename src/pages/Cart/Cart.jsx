import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { paymentService } from '../../services/paymentService';
import Button from '../../components/Button/Button';
import './Cart.css';

const Cart = () => {
    const { cart, loading, updateQuantity, removeItem, fetchCart, clearCartState } = useContext(CartContext);
    const navigate = useNavigate();

    const handleProceedToOrder = async () => {
        try {
            // 1. Create Razorpay order from backend
            const { orderId, amount, currency } = await paymentService.createOrder();

            // 2. Open Razorpay CheckOut
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Enter the Key ID generated from the Dashboard
                amount: amount * 100,
                currency: currency,
                name: "StackCoders Book Store",
                description: "Test Transaction",
                order_id: orderId,
                handler: async function (response) {
                    try {
                        // 3. Verify Payment
                        await paymentService.verifyPayment({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });
                        // 4. Success -> Clear Cart state and go to confirmation
                        clearCartState();
                        navigate('/order-confirmation', { state: { orderId: response.razorpay_order_id, amount } });
                    } catch (error) {
                        alert('Payment Verification Failed!');
                    }
                },
                theme: {
                    color: "#2563eb"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert('Payment Failed: ' + response.error.description);
            });
            rzp1.open();

        } catch (error) {
            alert(error.response?.data?.message || 'Failed to initiate payment');
        }
    };

    if (loading && !cart?.items?.length) {
        return <div className="cart-container loading">Loading cart...</div>;
    }

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>

            {(!cart?.items || cart.items.length === 0) ? (
                <div className="cart-empty">
                    <p>Your cart is empty.</p>
                    <Button onClick={() => navigate('/')}>Continue Shopping</Button>
                </div>
            ) : (
                <div className="cart-content">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.map(item => (
                                <tr key={item.id}>
                                    <td className="cart-product">
                                        {item.imageUrl && <img src={item.imageUrl} alt={item.bookName} className="cart-image" />}
                                        <span>{item.bookName}</span>
                                    </td>
                                    <td>{item.author}</td>
                                    <td>₹{item.price}</td>
                                    <td>
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </td>
                                    <td>₹{item.subTotal}</td>
                                    <td>
                                        <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="cart-summary">
                        <h3>Summary</h3>
                        <div className="summary-row">
                            <span>Total Items:</span>
                            <span>{cart.totalItems}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Grand Total:</span>
                            <span>₹{cart.grandTotal}</span>
                        </div>
                        <Button
                            className="checkout-btn"
                            onClick={handleProceedToOrder}
                            disabled={cart.items.length === 0}
                        >
                            Proceed To Order
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
