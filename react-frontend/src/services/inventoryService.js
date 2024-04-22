import axios from "axios";

const PRODUCT_BASE_URL = "http://localhost:8080/api/v1/inventory";

const getAllProducts = async () => {
    try {
        const response = await axios.get(PRODUCT_BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${PRODUCT_BASE_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const postNewProduct = async (productData) => {
    try {
        const response = await axios.post(PRODUCT_BASE_URL, productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateProduct = async (productId, productData) => {
    try {
        const response = await axios.put(`${PRODUCT_BASE_URL}/${productId}`, productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${PRODUCT_BASE_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const inventoryService = {
    getAllProducts,
    getProductById,
    postNewProduct,
    updateProduct,
    deleteProduct
};