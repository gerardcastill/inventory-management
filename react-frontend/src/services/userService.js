import axios from "axios";

const USER_BASE_URL= "http://localhost:8080/api/v1/staff";

const getAllUsers = async () => {
    try {
        const response = await axios.get(USER_BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${USER_BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const postNewUser = async (userData) => {
    try {
        const response = await axios.post(USER_BASE_URL, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${USER_BASE_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${USER_BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const userService = {
    getAllUsers,
    getUserById,
    postNewUser,
    updateUser,
    deleteUser
};