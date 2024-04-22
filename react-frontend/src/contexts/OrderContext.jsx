import React, { createContext, useState, useEffect } from 'react';
import { orderService } from "../services/orderService";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    // Fetch orders and related user data
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await orderService.getAllOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const addOrder = async (orderData) => {
        try {
            const newOrder = await orderService.postNewOrder(orderData);
            setOrders([...orders, { ...orderData, orderId: newOrder.orderId, dateCreated: newOrder.dateCreated }]);
        } catch (error) {
            console.error('Failed to add order:', error);
        }
    };

    const updateOrder = async (orderId, orderData) => {
        try {
            if (orderData.status === "COMPLETED" && !orderData.dateComplete) {
                orderData.dateComplete = new Date().toISOString();  // Set completion date if not set
            } else if (orderData.status !== "COMPLETED" && orderData.dateComplete){
                orderData.dateComplete = '';
            }

            await orderService.updateOrder(orderId, orderData);
            setOrders(orders.map(order => order.orderId === orderId ? { ...order, ...orderData } : order));
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            await orderService.deleteOrder(orderId);
            setOrders(orders.filter(order => order.orderId !== orderId));
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
