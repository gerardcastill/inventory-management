import React, {useContext, useEffect, useState} from "react";
import { OrderContext } from "../../contexts/OrderContext";
import {userService} from "../../services/userService";
import capitalizeFirstLetter from "../utils/Format";
import ModalLayout from "../layouts/ModalLayout";
import OrderForm from "../forms/order-form/OrdersForm";


const statuses = { COMPLETED: 'text-green-400 bg-green-400/10',
    PENDING: 'text-rose-400 bg-rose-400/10', CANCELLED: 'text-rose-400 bg-rose-400/10' }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function OrdersTable() {
    const { orders, addOrder, updateOrder, deleteOrder } = useContext(OrderContext);
    const [userNames, setUserNames] = useState({}); // Store user names mapped by userId
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        const fetchUserNames = async () => {
            const uniqueStaffIds = [...new Set(orders.map(order => order.staffId))];
            const userDetails = await Promise.all(uniqueStaffIds.map(userId => userService.getUserById(userId)));
            const names = userDetails.reduce((acc, user) => {
                acc[user.id] = `${user.firstName} ${user.lastName}`;
                return acc;
            }, {});
            setUserNames(names);
        };

        if (orders.length > 0) {
            fetchUserNames();
        }
    }, [orders]);

    const handleAddOrUpdateOrder = async (orderData) => {
        if (currentOrder && currentOrder.orderId) {
            // Update existing order
            try {
                await updateOrder(currentOrder.orderId, orderData);
            } catch (error) {
                console.error("Error updating order:", error);
            }
        } else {
            // Add new order
            try {
                await addOrder(orderData);
            } catch (error) {
                console.error("Error adding new order:", error);
            }
        }
        closeModal();
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId);
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    const openModalForEdit = (order) => {
        setCurrentOrder(order);
        setModalOpen(true);
    };

    const openModalForAdd = () => {
        setCurrentOrder(null);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentOrder(null);
    };

    return (
        <div className="bg-gray-900 h-full py-10">
            <div className="mx-auto max-w-7xl">

                {/*Table Heading Text*/}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Orders</h2>
                        <p className="px-8 mt-2 text-sm text-gray-300">
                            A list of all the orders created by orders in your account including their name, client, and
                            order status.
                        </p>
                    </div>

                    {/*Add Order Button*/}
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold
                            text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            onClick = {openModalForAdd}
                        >
                            Add Order
                        </button>
                    </div>
                </div>

            {/*Order table headings and spacing*/}
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
                        <th scope="col"
                            className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                            Date Created
                        </th>
                        <th scope="col"
                            className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                            OrderId
                        </th>
                        <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                            User Name
                        </th>
                        <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                            Client Name
                        </th>
                        <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left
                        lg:pr-20">
                            Status
                        </th>
                        <th scope="col"
                            className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                            Date Complete
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        </th>
                    </tr>
                </thead>

                {/*Order table elements and mapping*/}
                <tbody className="divide-y divide-white/5">
                {orders.map(order => (
                    <tr key={order.orderId}>

                        {/*Date order created element*/}
                        <td className="hidden py-4 pl-4 pr-8 text-left text-sm leading-6 text-gray-400 sm:table-cell
                        sm:pl-6 lg:pl-8">
                            <time dateTime={order.dateCreated}>
                                {new Date(order.dateCreated).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                            </time>
                        </td>

                        {/*Order ID element*/}
                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                            <div className="flex items-center gap-x-4">
                                <div className="truncate text-sm font-medium leading-6 text-white">
                                    {order.orderId}
                                </div>
                            </div>
                        </td>

                        {/*Username element*/}
                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                            <div className="flex items-center gap-x-4">
                                <div className="truncate text-sm font-medium leading-6 text-white">
                                    {userNames[order.staffId]}
                                </div>
                            </div>
                        </td>

                        {/*Client name element*/}
                        <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                            <div className="flex gap-x-3">
                                <div className="truncate text-sm font-medium leading-6 text-white">
                                    {order.clientName}
                                </div>
                            </div>
                        </td>

                        {/*Order status element*/}
                        <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                <div className={classNames(statuses[order.status], 'flex-none rounded-full p-1')}>
                                    <div className="h-1.5 w-1.5 rounded-full bg-current"/>
                                </div>
                                <div className="hidden text-white sm:block">
                                    {capitalizeFirstLetter(order.status)}
                                </div>
                            </div>
                        </td>

                        {/*Date order complete element*/}
                        {/*Checks to see if dateComplete field has data to print, if not, then it prints blank */}
                        <td className="hidden py-4 pl-4 pr-8 text-left text-sm leading-6 text-gray-400 sm:table-cell
                        sm:pl-6 lg:pl-8">
                            {order.dateComplete ? (
                                <time dateTime={order.dateComplete}>
                                    {new Date(order.dateComplete).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </time>
                            ) : ""}
                        </td>

                        {/*Edit order button*/}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                            <button onClick={() => openModalForEdit(order)}
                                    className="text-indigo-400 hover:text-indigo-300">
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}

                {/*Submit and Close button handling for modal*/}
                {isModalOpen && (
                    <ModalLayout onClose={closeModal}>
                        <OrderForm order={currentOrder}
                                   onSubmit={handleAddOrUpdateOrder}
                                   onDelete={handleDeleteOrder}
                                   onClose={closeModal} />
                    </ModalLayout>
                )}
                </tbody>
            </table>
            </div>
        </div>
    )
}