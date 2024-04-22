import React, { createContext, useState, useEffect } from 'react';
import { inventoryService } from "../services/inventoryService";

export const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await inventoryService.getAllProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);

    const addProduct = async (productData) => {
        const newProduct = await inventoryService.postNewProduct(productData);
        setProducts(prev => [...prev, newProduct]);
    };

    const updateProduct = async (productId, productData) => {
        const updatedProduct = await inventoryService.updateProduct(productId, productData);
        setProducts(prev => prev.map(product => product.productId === productId ? updatedProduct : product));
    };

    const deleteProduct = async (productId) => {
        await inventoryService.deleteProduct(productId);
        setProducts(prev => prev.filter(product => product.productId !== productId));
    };

    return (
        <InventoryContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </InventoryContext.Provider>
    );
};
