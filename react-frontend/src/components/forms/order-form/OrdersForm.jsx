import React, { useState, useEffect } from 'react';
import ProductList from "./ProductList";
import ProductSelector from "./ProductSelector";
import UserSelector from "./UserSelector";
import ClientSelector from "./ClientSelector";
import Pagination from "../Pagination.jsx";

const allProducts = [
    { productId: '123', productName: 'Widget',quantityAvailable: '10', quantityPending: '3', price: 25.00 },
    { productId: '456', productName: 'Gadget',quantityAvailable: '10', quantityPending: '3', price: 45.50 },
    { productId: '789', productName: 'Thing',quantityAvailable: '10', quantityPending: '3', price: 22.75 },
    // More products
];

const allUsers = [
    { userId:'123',firstName: 'Lindsay', lastName: 'Walton', email: 'lindsay.walton@example.com',userName:'lindy1',
        role: 'Member' },
]

const allClients = [
    { clientId:'123',firstName: 'Bimbsay', lastName: 'Balton', email: 'Bindsay.Balton@example.com', company: 'GC Enterprises' },
    { clientId:'456',firstName: 'Becky', lastName: 'Hill', email: 'Becky@example.com', company: 'Banana Inc' },
    { clientId:'897',firstName: 'Josh', lastName: 'Frank', email: 'Josh@example.com', company: 'Water Co' }
]

function OrderForm({ order, onSubmit, onDelete, onClose }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        userName: '',
        clientName: '',
        status: '',
        orderTotal: '',
        dateCreated: '',
        dateComplete: '',
        products: []
    });
    const [financials, setFinancials] = useState({
        subtotal: 0,
        markup: 0,
        total: 0
    });

    // Financial Calculations
    useEffect(() => {
        const subtotal = formData.products.reduce((acc, item) => acc + (item.price * (item.quantityOrdered || 0)), 0);
        const markup = subtotal * 0.30; // 30% markup
        const total = subtotal + markup;

        setFinancials({ subtotal, markup, total });
    }, [formData.products]);

    // Load order data into form when editing
    useEffect(() => {
        if (order) {
            setFormData({
                userName: order.userName || '',
                clientName: order.clientName || '',
                status: order.status || '',
                orderTotal: order.orderTotal || '0',
                dateCreated: order.dateCreated || '',
                dateComplete: order.status === "Completed" ? order.dateComplete : '',
                products: order.products || []
            });
        } else {
            // Set dateCreated for new orders to now
            setFormData(prev => ({
                ...prev,
                dateCreated: new Date().toISOString()
            }));
        }
    }, [order]);

    // Pagination logic
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = formData.products.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle adding a new product to the list
    const handleAddProduct = (newProduct) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            products: [...prevFormData.products, newProduct]
        }));
    };

    const handleProductChange = (updatedProducts) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            products: updatedProducts
        }));
    };

    const handleSelectUser = (userName) => {
        setFormData(prev => ({ ...prev, userName }));
    };

    const handleSelectClient = (clientName) => {
        setFormData(prevFormData => {
            return {...prevFormData, clientName: clientName};
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);  // Add this to check what's in the state

        // Validate the user field if creating a new order
        if (!formData.userName || formData.userName === '') {
            alert("Please select a user.");
            return;
        }

        // Validate the client field if creating a new order
        if (!formData.clientName || formData.clientName === '') {
            alert("Please select a client.");
            return;
        }

        // Validate the status field if creating a new order
        if (!order && (!formData.status || formData.status === "")) {
            alert("Please select a valid status.");
            return; // Stop the form submission
        }

        // Set dateComplete if the status is "Completed" and it wasn't already set
        if (formData.status === "Completed" && !formData.dateComplete) {
            formData.dateComplete = new Date().toISOString();
        }

        // Update formData with financials before submitting
        const updatedFormData = {
            ...formData,
            orderTotal: financials.total.toFixed(2) // Make sure to format or round as necessary
        };

        onSubmit(updatedFormData);
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            onDelete(order.orderId);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-10 px-20 bg-gray-800 space-y-4" style={{maxHeight: '90vh', overflowY: 'auto'}}>
                <div className="border-b border-white/10 pb-4">

                    {/*Form header*/}
                    <h2 className="text-base font-semibold leading-none text-white">
                        Order Information
                    </h2>

                    {/*Form inputs*/}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="dateCreated" className="block text-sm font-medium leading-6 text-white">
                                Date Created
                            </label>
                            <div className="mt-2">
                                <div
                                    id="dateCreated"
                                    className="block w-full rounded-md  py-1.5 text-white  sm:text-sm sm:leading-6"
                                >
                                    {formData.dateCreated && new Date(formData.dateCreated).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/*Status input*/}
                        <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-white">
                                Status
                            </label>
                            <div className="mt-2">
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="block w-9/12 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6 [&_*]:text-black"
                                >
                                    {!order && <option value=""> Select status</option>}
                                    <option value="Completed">Completed</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        {/*Username input*/}
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                                User Name
                            </label>
                            <div className="mt-2">
                                <UserSelector users={allUsers} onSelectUser={handleSelectUser} />
                            </div>
                        </div>

                        {/*Client name input*/}
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                                Client Name
                            </label>
                            <div className="mt-2">
                                <ClientSelector clients={allClients} onSelectClient={handleSelectClient} />
                            </div>
                        </div>
                    </div>
                </div>

                {/*Order form table*/}
                <div className="border-white/10 pb-4">
                    <ProductSelector products={allProducts} onAddProduct={handleAddProduct}/>
                    <ProductList products={currentItems} onProductChange={handleProductChange}/>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={formData.products.length}
                        paginate={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>

                {/* Financial Calculations */}
                <div className="text-right text-gray-50">
                    <div>Subtotal: ${financials.subtotal.toFixed(2)}</div>
                    <div>Markup (30%): ${financials.markup.toFixed(2)}</div>
                    <div>Total: ${financials.total.toFixed(2)}</div>
                </div>

                {/*Form buttons*/}
                <div className="mt-6 flex items-center justify-end gap-x-6">

                    {/*Conditional delete order button (only if editing order)*/}
                    {order && (
                        <button type="button" onClick={handleDelete}
                                className="rounded-md mr-20 bg-red-500 px-4 py-2 text-sm font-semibold text-white
                            shadow-sm hover:bg-red-600">
                            Delete Order
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
                        {order ? 'Update Order' : 'Add Order'}
                    </button>
                </div>

            </div>
        </form>
    );
}

export default OrderForm;