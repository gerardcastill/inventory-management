import React, { useState, useEffect } from 'react';

function InventoryForm({ product, onSubmit, onDelete, onClose }) {
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        productDescription: '',
        quantityAvailable: '0',
        quantityPending: '0',
        price: ''
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
                quantityReceived: 0,
                price: product.price || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convert empty strings to zero before any further processing
        setFormData(prev => ({ ...prev, [name]: value === "" ? 0 : parseInt(value, 10) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedQuantity = parseInt(formData.quantityAvailable, 10) + parseInt(formData.quantityReceived, 10);
        const updatedData = { ...formData, quantityAvailable: updatedQuantity, quantityReceived: 0 };
        onSubmit(updatedData);
        onClose();
    };

    const handleDelete = () => {
        if(product.quantityPending !== '0'){
            alert("Please remove all pending orders with this product.");
            return; // Stop the form from deleting
        }

        if (window.confirm("Are you sure you want to delete this product?")) {
            onDelete(product.productId);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-10 px-20 bg-gray-800 space-y-4">
                <div className="border-b border-white/10 pb-12">

                    {/*Form header*/}
                    <h2 className="text-base font-semibold leading-7 text-white">
                        Product Information
                    </h2>

                    {/*Form inputs*/}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/*Product ID viewable*/}
                        <div className="sm:col-span-2">
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

                        {/*Product name input*/}
                        <div className="sm:col-span-4">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="productName"
                                    id="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    className="block w-8/12 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Quantity Available display */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-white">Quantity Available</label>
                            <div className="mt-1 text-white">{formData.quantityAvailable}</div>
                        </div>

                        {/* Quantity Received input */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-white">Quantity Received</label>
                            <input
                                type="number"
                                name="quantityReceived"
                                value={formData.quantityReceived}
                                onChange={handleChange}
                                className="mt-1 block w-4/12 rounded-md bg-white/10 py-1.5 text-white"
                            />
                        </div>

                        {/*Product description input*/}
                        <div className="sm:col-span-4">
                            <label htmlFor="productDescription"
                                   className="block text-sm font-medium leading-6 text-white">
                                Product Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="productDescription"
                                    name="productDescription"
                                    type="productDescription"
                                    rows={3}
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>

                        {/*Price Per Unit input*/}
                        <div className="sm:col-span-2">
                            <label htmlFor="quantityAvailable"
                                   className="block text-sm font-medium leading-6 text-white">
                                Price Per Unit
                            </label>
                            <div className="mt-2">
                                <input
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="block w-8/12 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6 [&_*]:text-black"
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