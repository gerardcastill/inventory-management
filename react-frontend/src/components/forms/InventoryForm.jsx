import React, { useState, useEffect } from 'react';
import ErrorAlert from "../alerts/ErrorAlert";
import DeleteAlert from "../alerts/DeleteAlert";

function InventoryForm({ product, onSubmit, onDelete, onClose }) {
    const [errorAlert, setErrorAlert] = useState({ show: false, message: '' });
    const [deleteAlert, setDeleteAlert] = useState({ show: false, message: '' });
    const [quantityReceived, setQuantityReceived] = useState(0);
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        productDescription: '',
        quantityAvailable: '0',
        quantityPending: '0',
        price: '0'
    });

    // Load product data into form when editing
    useEffect(() => {
        if (product) {
            setFormData({
                productId: product.productId || '',
                productName: product.productName || '',
                productDescription: product.productDescription || '',
                quantityAvailable: product.quantityAvailable || '0',
                quantityPending: product.quantityPending ||'0',
                price: product.price || '0'
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "quantityAvailable" || name === "quantityPending") {
            const numValue = value === "" ? 0 : Math.min(1000, parseInt(value, 10));
            setFormData(prev => ({ ...prev, [name]: numValue }));
        } else if (name === "quantityReceived") {
            const numValue = value === "" ? 0 : Math.min(1000, parseInt(value, 10));
            setQuantityReceived(numValue);
        } else if (name === "price") {
            const numValue = value === "" ? 0 : Math.min(9999.99, parseFloat(value).toFixed(2));
            setFormData(prev => ({ ...prev, [name]: numValue }));
        } else {
            // Handle text inputs normally
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
            quantityAvailable: formData.quantityAvailable + quantityReceived
        };
        onSubmit(updatedData);
        setQuantityReceived(0); // Reset after submission
        onClose();
    };

    const handleDelete = () => {
        if (parseInt(product.quantityPending, 10) !== 0) {
            setErrorAlert({ show: true, message: "Please remove all pending orders with this product before deleting." });
            return; // Stop the form from deleting
        }

        // Clear any error messages
        setErrorAlert({ show: false, message: '' });

        // Prepare and show the delete confirmation alert
        setDeleteAlert({
            show: true,
            message: "Are you sure you want to delete this product? This action cannot be undone."
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-10 px-20 bg-gray-800 space-y-4">
                {/* Display the Error alert if needed */}
                {errorAlert.show && <ErrorAlert message={errorAlert.message} />}

                {/* Display the Delete alert if needed */}
                {deleteAlert.show && (
                    <DeleteAlert
                        onClose={() => setDeleteAlert({ ...deleteAlert, show: false })}
                        onConfirm={() => {
                            onDelete(product.productId);
                            setDeleteAlert({ show: false, message: '' }); // Hide alert after confirming
                            onClose(); // If you need to close the form after deletion
                        }}
                        message={deleteAlert.message}
                    />
                )}

                <div className="border-b border-white/10 pb-12">
                    {/*Form header*/}
                    <h2 className="text-base font-semibold leading-7 text-white">
                        Product Information
                    </h2>

                    {/*Form inputs*/}
                    <div className="mt-10 grid gap-y-8 sm:grid-cols-3">

                        {/*Product ID conditionally viewable*/}
                        {product && (
                            <div className="lg:col-span-5">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                                    Product Id
                                </label>
                                <div className="mt-2">
                                    <div
                                    id="productId"
                                    className="block w-full rounded-md  py-1.5 text-white  sm:text-sm sm:leading-6">
                                        {formData.productId}
                                    </div>
                                </div>
                            </div>
                        )}


                        {/*Product name input*/}
                        <div className="lg:col-span-2">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="productName"
                                    id="productName"
                                    value={formData.productName}
                                    maxLength="30"
                                    onChange={handleChange}
                                    className="block w-60 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Quantity Available display */}
                        <div className="lg:col-span-3 px-3">
                            <label className="block text-sm font-medium leading-6 text-white">Quantity Available</label>
                            <div className="mt-2 text-center text-white">{formData.quantityAvailable}</div>
                        </div>

                        {/* Quantity Received input */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-white">Quantity Received</label>
                            <input
                                type="number"
                                name="quantityReceived"
                                value={quantityReceived}
                                onChange={handleChange}
                                min="0"
                                max="1000"
                                className="mt-1 block w-4/12 rounded-md bg-white/10 py-1.5 text-white shadow-sm
                                ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                sm:text-sm sm:leading-6"
                            />
                        </div>

                        {/*Price Per Unit input*/}
                        <div className="lg:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-white">
                                Price Per Unit
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    min="0"
                                    max="9999.99"
                                    onChange={handleChange}
                                    step="0.01" // Allows entering decimal values to two decimal places
                                    className="block w-8/12 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6 [&_*]:text-black"
                                />
                            </div>
                        </div>

                        {/*Product description input*/}
                        <div className="sm:col-span-5">
                            <label htmlFor="productDescription"
                                   className="block text-sm font-medium leading-6 text-white">
                                Product Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="productDescription"
                                    name="productDescription"
                                    rows={3}
                                    value={formData.productDescription}
                                    maxLength="500"
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>


                    </div>
                </div>

                {/*Form buttons*/}
                <div className="mt-6 flex items-center justify-end gap-x-6">

                    {/*Conditional delete product button (only if editing product)*/}
                    {product && (
                        <button type="button" onClick={handleDelete}
                                className="rounded-md mr-20 bg-red-500 px-4 py-2 text-sm font-semibold text-white
                                shadow-sm hover:bg-red-600">
                            Delete Product
                        </button>
                    )}

                    {/*Cancel button*/}
                    <button type="button" onClick={onClose} className="text-sm font-semibold leading-6 text-white">
                        Cancel
                    </button>

                    {/*Submit button*/}
                    <button type="submit"
                            className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm
                            hover:bg-indigo-600">
                        {product ? 'Update Product' : 'Add Product'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default InventoryForm;