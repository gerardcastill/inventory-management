import React from 'react';
import UserSelector from "../../utils/UserSelector";
import ClientSelector from "../../utils/ClientSelector";

const OrderDetailsForm = ({ formData, handleChange, handleSelectUser, handleSelectClient, order, users, clients }) => {
    return (
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-7">

                    {/*Conditionally show Date Created only for existing orders*/}
                    {order && (
                        <div className="sm:col-span-5">
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
                    )}

                    {/*Conditionally show Date Complete only for existing orders*/}
                    {order && (
                        <div className="sm:col-span-6 lg:col-span-2">
                            <label htmlFor="dateCreated" className="block text-sm font-medium leading-6 text-white">
                                Date Complete
                            </label>
                            <div className="mt-2">
                                <div
                                    id="dateComplete"
                                    className="block w-full rounded-md  py-1.5 text-white  sm:text-sm sm:leading-6"
                                >
                                    {formData.dateComplete&& new Date(formData.dateComplete).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    )}

                    {/*Status input*/}
                    <div className="sm:col-span-1 lg:col-span-2">
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
                                <option value="COMPLETED">Completed</option>
                                <option value="PENDING">Pending</option>
                                {order && <option value="CANCELLED"> Cancelled</option>}
                            </select>
                        </div>
                    </div>
                    {/*Username input*/}
                    <div className="sm:col-span-3 lg:col-span-2">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                            User Name
                        </label>
                        <div className="mt-2">
                            <UserSelector users={users} selectedUser={formData.staffId} onSelectUser={handleSelectUser}/>
                        </div>
                    </div>

                    {/*Client name input*/}
                    <div className="sm:col-span-3 lg:col-span-2">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                            Client Name
                        </label>
                        <div className="mt-2">
                            <ClientSelector
                                clients={clients}
                                selectedClient={formData.clientName}
                                onSelectClient={handleSelectClient}
                            />
                        </div>
                    </div>
                </div>
    );
};

export default OrderDetailsForm;