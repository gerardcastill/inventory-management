import React, {useEffect, useState} from "react";
import ModalLayout from "../layouts/ModalLayout";
import InventoryForm from "../forms/InventoryForm";
import {inventoryService} from "../../services/inventoryService";

export default function InventoryTable() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const handleAddOrUpdateProduct = async (productData) => {
        if (currentProduct) {
            // Update existing product
            const updatedProduct = await inventoryService.updateProduct(currentProduct.productId, productData);
            setProducts(products.map(product => product.productId === currentProduct.productId ? updatedProduct : product));
        } else {
            // Add new product
            const newProduct = await inventoryService.postNewProduct(productData);
            setProducts([...products, newProduct]);
        }
        closeModal();
    };

    const handleDeleteProduct = async (productId) => {
        await inventoryService.deleteProduct(productId);
        setProducts(products.filter(product => product.productId !== productId));
    };

    const openModalForEdit = (product) => {
        setCurrentProduct(product);
        setModalOpen(true);
    };

    const openModalForAdd = () => {
        setCurrentProduct(null);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentProduct(null);
    };

// Fetch products when the component mounts
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

    return (
        <div className="bg-gray-900 py-10 h-full">
            <div className="mx-auto max-w-7xl">

                {/*Inventory table heading text*/}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Inventory</h2>
                        <p className="px-8 mt-2 text-sm text-gray-300">
                            A list of all product items in your account including their product name, description,
                            quantity available, and quantity pending in orders.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

                        {/*Add Product Button*/}
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold
                            text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            onClick = {openModalForAdd}
                        >
                            Add Product
                        </button>
                    </div>
                </div>

                {/*Inventory Table Elements*/}
                <table className="mt-6 w-full whitespace-nowrap text-left">
                    <colgroup>
                        <col className="w-full sm:w-1/12"/>
                        <col className="lg:w-1/12"/>
                        <col className="lg:w-1/12"/>
                        <col className="lg:w-1/12"/>
                        <col className="lg:w-1/12"/>
                        <col className="lg:w-1/12"/>
                        <col className="lg:w-1/12"/>
                    </colgroup>
                    <thead className="border-b border-white/10 text-sm leading-6 text-white">
                    <tr>
                        <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                            Product ID
                        </th>
                        <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                            Product Name
                        </th>
                        <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left
                            lg:pr-20">
                            Product Description
                        </th>
                        <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left
                            lg:pr-20">
                            Quantity Available
                        </th>
                        <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left
                            lg:pr-20">
                            Quantity Pending
                        </th>
                        <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left
                            lg:pr-20">
                            Price Per Unit
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">

                    {/*Maps product data to table*/}
                    {products.map((product) => (
                        <tr key={product.productId}>

                            {/*Product ID*/}
                            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                <div className="flex items-center gap-x-4">
                                    <div
                                        className="truncate text-sm font-medium leading-6 text-white">
                                        {product.productId}
                                    </div>
                                </div>
                            </td>

                            {/*Product Name*/}
                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                <div className="flex gap-x-3">
                                    <div
                                        className="truncate text-sm font-medium leading-6 text-white">
                                        {product.productName}
                                    </div>
                                </div>
                            </td>

                            {/*Product Description*/}
                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                <div className="flex gap-x-3">
                                    <div
                                        className="truncate text-sm font-medium leading-6 text-white">
                                        {truncateText(product.productDescription, 50)} {/* Limiting to 50 characters */}
                                    </div>
                                </div>
                            </td>

                            {/*Quantity Available*/}
                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                <div className="flex gap-x-3">
                                    <div
                                        className="truncate text-sm font-medium leading-6 text-white">
                                        {product.quantityAvailable}
                                    </div>
                                </div>
                            </td>

                            {/*Quantity Pending*/}
                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                <div className="flex gap-x-3">
                                    <div
                                        className="truncate text-sm font-medium leading-6 text-white">
                                        {product.quantityPending}
                                    </div>
                                </div>
                            </td>

                            {/*Price Per Unit*/}
                            <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                <div className="flex gap-x-3">
                                    <div
                                        className="truncate text-sm font-medium leading-6 text-white">
                                        {product.price}
                                    </div>
                                </div>
                            </td>

                            {/*Edit Button*/}
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                                <button onClick={() => openModalForEdit(product)}
                                        className="text-indigo-400 hover:text-indigo-300">
                                    Edit<span className="sr-only">, {product.productId}</span>
                                </button>
                            </td>
                        </tr>
                    ))}

                    {/*Submit and Close button handling for modal*/}
                    {isModalOpen && (
                        <ModalLayout onClose={closeModal}>
                            <InventoryForm product={currentProduct}
                                           onSubmit={handleAddOrUpdateProduct}
                                           onDelete={handleDeleteProduct}
                                           onClose={closeModal} />
                        </ModalLayout>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
