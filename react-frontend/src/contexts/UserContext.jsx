import React, { createContext, useState, useEffect } from 'react';
import { userService } from "../services/userService";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const fetchedUsers = await userService.getAllUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }
        fetchUsers();
    }, []);

    const addUser = async (userData) => {
        const newUser = await userService.postNewUser(userData);
        setUsers(prev => [...prev, newUser]);
    };

    const updateUser = async (id, userData) => {
        const updatedUser = await userService.updateUser(id, userData);
        setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
    };

    const deleteUser = async (id) => {
        await userService.deleteUser(id);
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    return (
        <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
