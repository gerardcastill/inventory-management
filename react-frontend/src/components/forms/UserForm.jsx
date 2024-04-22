import React, { useState, useEffect } from 'react';
import ErrorAlert from "../alerts/ErrorAlert";
import DeleteAlert from "../alerts/DeleteAlert";

function UserForm({ user, onSubmit, onDelete, onClose }) {
    const [errorAlert, setErrorAlert] = useState({ show: false, message: '' });
    const [deleteAlert, setDeleteAlert] = useState({ show: false, message: '' });
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        emailId: '',
        userName: '',
        role: ''
    });

    // Load user data into form when editing
    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                emailId: user.emailId || '',
                userName: user.userName || '',
                role: user.role || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "firstName" || name === "lastName") {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                setErrorAlert({ show: true, message: 'Names must not contain numbers.' });
            } else {
                setErrorAlert({ show: false, message: '' });
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else if (name === "emailId") {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.emailId.includes('@')) {
            setErrorAlert({ show: true, message: 'Please enter a valid email address.' });
            return;
        }
        if (!formData.role) {
            setErrorAlert({ show: true, message: 'Please select a valid role.' });
            return;
        }
        setErrorAlert({ show: false, message: '' }); // Clear any existing alerts
        onSubmit(formData);
        onClose();
    };

    const handleDelete = () => {
        // Prepare and show the delete confirmation alert
        setDeleteAlert({
            show: true,
            message: "Are you sure you want to delete this user? This action cannot be undone."
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-10 px-20 bg-gray-800 space-y-12">
                {/* Display the Error alert if needed */}
                {errorAlert.show && <ErrorAlert message={errorAlert.message} />}

                {/* Display the Delete alert if needed */}
                {deleteAlert.show && (
                    <DeleteAlert
                        onClose={() => setDeleteAlert({ ...deleteAlert, show: false })}
                        onConfirm={() => {
                            onDelete(user.id);
                            setDeleteAlert({ show: false, message: '' }); // Hide alert after confirming
                            onClose(); // If you need to close the form after deletion
                        }}
                        message={deleteAlert.message}
                    />
                )}
                <div className="border-b border-white/10 pb-12">

                    {/*Form header*/}
                    <h2 className="text-base font-semibold leading-7 text-white">
                        Personal Information
                    </h2>

                    {/*Inputs for form*/}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/*First name input*/}
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    maxLength="15"
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/*Last name input*/}
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formData.lastName}
                                    maxLength="15"
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/*Email address input*/}
                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="emailId"
                                    name="emailId"
                                    type="emailId"
                                    value={formData.emailId}
                                    maxLength="50"
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/*Username input*/}
                        <div className="sm:col-span-3">
                            <label htmlFor="userName" className="block text-sm font-medium leading-6 text-white">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    value={formData.userName}
                                    maxLength="16"
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/*Role input*/}
                        <div className="sm:col-span-3">
                            <label htmlFor="role" className="block text-sm font-medium leading-6 text-white">
                                Role
                            </label>
                            <div className="mt-2">
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6 [&_*]:text-black"
                                >
                                    {!user && <option value=""> Select role</option>}
                                    <option>Admin</option>
                                    <option>Employee</option>
                                    <option>Manager</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Buttons on form*/}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    {/*Conditional delete user button (only on edit user)*/}
                    {user && (
                        <button type="button" onClick={handleDelete}
                                className="rounded-md mr-20 bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm
                            hover:bg-red-600">
                            Delete User
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
                        {user ? 'Update User' : 'Add User'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default UserForm;