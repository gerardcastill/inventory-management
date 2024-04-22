import React, { useState, useEffect } from 'react';
import { userService } from "../../../services/userService";
import { inventoryService } from "../../../services/inventoryService";
import ProductList from "./ProductList";
import ProductSelector from "../../utils/ProductSelector";
import Pagination from "../../utils/Pagination.jsx";
import ErrorAlert from "../../alerts/ErrorAlert";
import DeleteAlert from "../../alerts/DeleteAlert";
import OrderDetailsForm from "./OrderDetailsForm";

// Hard coded clients list since there is no client module
const allClients = [
    { clientName: 'Bimbsay Balton', email: 'Bindsay.Balton@example.com', company: 'GC Enterprises' },
    { clientName: 'Becky Hill', email: 'Becky@example.com', company: 'Banana Inc' },
    { clientName: 'Josh Frank', email: 'Josh@example.com', company: 'Water Co' }
]

function OrderForm({ order, onSubmit, onDelete, onClose }) {
    const [errorAlert, setErrorAlert] = useState({ show: false, message: '' });
    const [deleteAlert, setDeleteAlert] = useState({ show: false, message: '' });
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        orderId: '',
        staffId: '',
        clientName: '',
        status: '',
        orderTotal: '',
        dateCreated: '',
        dateComplete: '',
        orderDetails: []
    });
    const [financials, setFinancials] = useState({
        subtotal: 0,
        tax: 0,
        total: 0
    });

    // Pagination logic
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = formData.orderDetails.slice(indexOfFirstItem, indexOfLastItem);


    // Fetch users and products on component mount
    useEffect(() => {
        console.log("Fetching users and products");
        async function fetchData() {
            const fetchedUsers = await userService.getAllUsers();
            const fetchedProducts = await inventoryService.getAllProducts();
            setUsers(fetchedUsers);
            setProducts(fetchedProducts);
        }
        fetchData();
    }, []);

    // Populate formData with order and orderDetails with product info
    useEffect(() => {
        if (order) {
            // Method to map order details with product info
            const detailedOrderDetails = order.orderDetails.map(detail => {
                const product = products.find(p => p.productId === detail.productId);
                return {
                    ...detail,
                    productName: product?.productName,
                    productDescription: product?.productDescription,
                    price: product?.price,
                    quantityAvailable: product?.quantityAvailable,
                    quantityPending: product?.quantityPending
                };
            });

            // Setting formData using order information and detailedOrderDetails
            setFormData(prev => ({
                ...prev,
                orderId: order.orderId,
                staffId: order.staffId || '',
                clientName: order.clientName,
                status: order.status,
                orderTotal: order.orderTotal,
                dateCreated: order.dateCreated,
                dateComplete: order.dateComplete || '',
                orderDetails: detailedOrderDetails
            }));
        }
    }, [order, products]);  // Check dependency array

    // Financial Calculations everytime quantityOrdered changes
    useEffect(() => {
        const subtotal = formData.orderDetails.reduce((acc, item) => acc + (item.price * item.quantityOrdered), 0);
        const tax = subtotal * 0.08;  // Calculate 30% markup
        const total = subtotal + tax;
        setFinancials({ subtotal, tax, total });
    }, [formData.orderDetails]);


    // Helper functions
    const updateInventoryForStatusChange = (orderDetails, newStatus, oldStatus) => {
        return orderDetails.map(detail => {
            let quantityAvailable = detail.quantityAvailable;
            let quantityPending = detail.quantityPending;

            if (oldStatus === "PENDING" && newStatus === "COMPLETED") {
                quantityPending -= detail.quantityOrdered;
            } else if (oldStatus === "PENDING" && newStatus === "CANCELLED") {
                quantityPending -= detail.quantityOrdered;
                quantityAvailable += detail.quantityOrdered;
            } else if (oldStatus === "COMPLETED" && newStatus === "PENDING") {
                quantityPending += detail.quantityOrdered;
            } else if (oldStatus === "COMPLETED" && newStatus === "CANCELLED") {
                quantityAvailable += detail.quantityOrdered;
            } else if (oldStatus === "CANCELLED" && newStatus === "PENDING") {
                quantityAvailable -= detail.quantityOrdered;
                quantityPending += detail.quantityOrdered;
            } else if (oldStatus === "CANCELLED" && newStatus === "COMPLETED") {
                quantityAvailable -= detail.quantityOrdered;
            }

            return {
                ...detail,
                quantityAvailable,
                quantityPending
            };
        });
    };

    // Handles adding product to ProductList and updating pages for pagination
    const handleAddProduct = (product) => {
        const newProductDetail = {
            productId: product.productId,
            productDescription: product.productDescription,
            quantityOrdered: 0,
            productName: product.productName,
            price: product.price,
            quantityAvailable: product.quantityAvailable,
            quantityPending: product.quantityPending
        };

        setFormData(prev => {
            const updatedOrderDetails = [...prev.orderDetails, newProductDetail];
            const newTotalPages = Math.ceil(updatedOrderDetails.length / itemsPerPage);
            // Optionally adjust the current page if you are adding items on the last page and it becomes overflown
            if (currentPage < newTotalPages) {
            setCurrentPage(currentPage + 1);
        }
        return {...prev, orderDetails: updatedOrderDetails};
        });
    };

    // Handles deleting product from ProductList
    const handleDeleteProduct = (productId) => {
        setFormData(prev => ({
            ...prev,
            orderDetails: prev.orderDetails.filter(detail => detail.productId !== productId)
        }));
    };

    // Handles quantity change from ProductList
    const handleQuantityChange = (productId, newQuantityOrdered, quantityDifference) => {
        setFormData(prevFormData => {
            const updatedOrderDetails = prevFormData.orderDetails.map(detail => {
                if (detail.productId === productId) {
                    return {
                        ...detail,
                        quantityOrdered: newQuantityOrdered,
                        quantityAvailable: detail.quantityAvailable - quantityDifference,
                        quantityPending: detail.quantityPending + quantityDifference
                    };
                }
                return detail;
            });
            return {
                ...prevFormData,
                orderDetails: updatedOrderDetails
            };
        });
    };

    // Handles page change from pagination
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Handles selecting a user from UserSelector
    const handleSelectUser = (userId) => {
        setFormData(prev => ({
            ...prev,
            staffId: userId // Ensure this is the actual ID passed from UserSelector
        }));
    };

    // Handles selecting a client from ClientSelector
    const handleSelectClient = (clientName) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            clientName: clientName
        }));
    };

    // Handles changes to form that include adding and removing from quantityPending by status
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "status") {
            const previousStatus = formData.status;
            const updatedOrderDetails = updateInventoryForStatusChange(formData.orderDetails, value, previousStatus);

            // Update formData with the new order details that include the updated quantities
            setFormData(prev => ({
                ...prev,
                status: value,
                orderDetails: updatedOrderDetails
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };


    // Handles form submission through formating order information and validating inputs
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure all products are updated in the database
        formData.orderDetails.forEach(detail => {
            inventoryService.updateProduct(detail.productId, {
                productName: detail.productName,
                productDescription: detail.productDescription,
                price: detail.price,
                quantityAvailable: detail.quantityAvailable,
                quantityPending: detail.quantityPending
            }).then(response => {
                console.log("Inventory updated for product:", detail.productId);
            }).catch(error => {
                console.error("Failed to update inventory for product:", detail.productId, error);
                setErrorAlert({ show: true, message: `Failed to update inventory for product ${detail.productId}` });
            });
        });

        // Handle the updated orderDetails structure
        const orderDataToSubmit = {
            ...formData,
            orderDetails: formData.orderDetails.map(detail => ({
                productId: detail.productId,
                quantityOrdered: detail.quantityOrdered
            }))
        };

        // Validate the user field if creating a new order
        if (!formData.staffId || formData.staffId === '') {
            setErrorAlert({ show: true, message: "Please select a user." });
            return;
        }

        // Validate the client field if creating a new order
        if (!formData.clientName || formData.clientName === '') {
            setErrorAlert({ show: true, message: "Please select a client." });
            return;
        }

        // Validate the status field if creating a new order
        if (!order && (!formData.status || formData.status === "")) {
            setErrorAlert({ show: true, message: "Please select a valid status." });
            return;
        }

        // Update formData with financials before submitting
        orderDataToSubmit.orderTotal = financials.total.toFixed(2); // Make sure to format or round as necessary
        onSubmit(orderDataToSubmit);
        onClose();
    };

    // Handles deleting an order by orderId
    const handleDelete = () => {
        if (formData.orderDetails.some(detail => detail.quantityPending > 0)) {
            setDeleteAlert({
                show: true,
                message: "Are you sure you want to delete this order? This action cannot be undone."
            });
        } else {
            setDeleteAlert({
                show: true,
                message: "Are you sure you want to delete this order? This action cannot be undone."
            });
        }
    };

    // Reverts inventory to status before order if order is pending status, triggered when deletion is confirmed
    const onDeleteConfirm = async () => {
        try {
            // First, revert inventory by updating each product
            const inventoryUpdates = formData.orderDetails.map(detail => {
                let currentStatus = order.status;
                let quantityAvailable = detail.quantityAvailable;
                let quantityPending = detail.quantityPending;

                if (currentStatus === "PENDING") {
                    quantityPending -= detail.quantityOrdered;
                    quantityAvailable += detail.quantityOrdered;
                }

                return inventoryService.updateProduct(detail.productId, {
                    productName: detail.productName,
                    productDescription: detail.productDescription,
                    price: detail.price,
                    quantityAvailable: quantityAvailable,
                    quantityPending: quantityPending
                });
            });
            await Promise.all(inventoryUpdates);

            // If inventory reverts are successful, delete the order
            await onDelete(formData.orderId);
            console.log("Order deleted and inventory updated.");
            setDeleteAlert({ show: false, message: '' }); // Close the alert
            onClose(); // Close the form or redirect as necessary
        } catch (error) {
            console.error("Failed to update inventory or delete order:", error);
            setErrorAlert({ show: true, message: "Failed to update inventory or delete order." });
            setDeleteAlert({ show: false, message: '' }); // Close the alert anyway
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-10 px-20 bg-gray-800 space-y-4" style={{maxHeight: '90vh', overflowY: 'auto'}}>
                {/* Display the Error alert if needed */}
                {errorAlert.show && <ErrorAlert message={errorAlert.message} />}

                {/* Display the Delete alert if needed */}
                {deleteAlert.show && (
                    <DeleteAlert
                        onClose={() => setDeleteAlert({ ...deleteAlert, show: false })}
                        onConfirm={onDeleteConfirm}
                        message={deleteAlert.message}
                    />
                )}
                <div className="border-b border-white/10 pb-4">

                    {/*Form header*/}
                    <h2 className="text-base font-semibold leading-none text-white">
                        Order Information
                    </h2>

                    {/*Form inputs*/}
                    <OrderDetailsForm
                        formData={formData}
                        order ={order}
                        handleChange = {handleChange}
                        handleSelectUser={handleSelectUser}
                        handleSelectClient={handleSelectClient}
                        users={users}
                        clients={allClients} />
                    </div>

                    {/*Order form table*/}
                    <div className="border-white/10 pb-4">
                        <ProductSelector
                            products={products}
                            onAddProduct={handleAddProduct}
                            selectedProductIds={formData.orderDetails.map(detail => detail.productId)}
                        />
                        <ProductList
                            orderDetails={currentItems}
                            onQuantityChange={handleQuantityChange}
                            onDeleteProduct={handleDeleteProduct}
                             />
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={formData.orderDetails.length}
                            paginate={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>

                    {/* Financial Calculations */}
                    <div className="text-right text-gray-50">
                        <div>Subtotal: ${financials.subtotal.toFixed(2)}</div>
                        <div>Tax (8%): ${financials.tax.toFixed(2)}</div>
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