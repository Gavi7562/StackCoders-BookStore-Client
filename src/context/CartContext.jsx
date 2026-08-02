import { createContext, useState, useEffect, useCallback } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState({ items: [], totalItems: 0, grandTotal: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = useCallback(async () => {
        if (!user) {
            setCart({ items: [], totalItems: 0, grandTotal: 0 });
            return;
        }
        setLoading(true);
        try {
            const data = await cartService.getCart();
            setCart(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch cart');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (productId, quantity = 1) => {
        if (!user) throw new Error('Please login to continue');
        try {
            await cartService.addToCart(productId, quantity);
            await fetchCart();
        } catch (err) {
            throw err;
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (!user) return;
        try {
            await cartService.updateCartItem(itemId, quantity);
            await fetchCart();
        } catch (err) {
            throw err;
        }
    };

    const removeItem = async (itemId) => {
        if (!user) return;
        try {
            await cartService.deleteCartItem(itemId);
            await fetchCart();
        } catch (err) {
            throw err;
        }
    };

    const clearCartState = () => {
        setCart({ items: [], totalItems: 0, grandTotal: 0 });
    };

    return (
        <CartContext.Provider value={{ cart, loading, error, addToCart, updateQuantity, removeItem, fetchCart, clearCartState }}>
            {children}
        </CartContext.Provider>
    );
};
