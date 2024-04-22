import axios from "axios";

const ORDER_BASE_URL = "http://localhost:8080/api/v1/order";

const getAllOrders = async () => {
    try {
        const response = await axios.get(ORDER_BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${ORDER_BASE_URL}/${orderId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const postNewOrder = async (orderData) => {
    try {
        const response = await axios.post(ORDER_BASE_URL, orderData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateOrder = async (orderId, orderData) => {
    try {
        const response = await axios.put(`${ORDER_BASE_URL}/${orderId}`, orderData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteOrder = async (orderId) => {
    try {
        const response = await axios.delete(`${ORDER_BASE_URL}/${orderId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const orderService = {
    getAllOrders,
    getOrderById,
    postNewOrder,
    updateOrder,
    deleteOrder
};