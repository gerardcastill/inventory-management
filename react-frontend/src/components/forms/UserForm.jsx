import React, { useState, useEffect } from 'react';

function UserForm({ user, onSubmit, onDelete, onClose }) {
    const [formData, setFormData] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        role: ''
    });

    // Load user data into form when editing
    useEffect(() => {
        if (user) {
            setFormData({
                userId: user.userId || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                userName: user.userName || '',
                role: user.role || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the role field if creating a new user
        if (!user && (!formData.role || formData.role === "")) {
            alert("Please select a valid role.");
            return; // Stop the form submission
        }

        onSubmit(formData);
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            onDelete(user.userId);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="py-10 px-20 bg-gray-800 space-y-12">
                <div className="border-b border-white/10 pb-12">
                    {/*Form header*/}
                    <h2 className="text-base font-semibold leading-7 text-white">
                        Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                        Use a permanent address where you can receive mail.
                    </p>

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
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/*Email address input*/}
                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/*Username input*/}
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    value={formData.userName}
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
                                    {!user && <option value=""> Select status</option>}
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