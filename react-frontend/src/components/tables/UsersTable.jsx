import React, {useState} from 'react';
import ModalLayout from "../layouts/ModalLayout";
import UserForm from "../forms/UserForm";

// Loads initial users
const initialUsers = [
    { userId:'123',firstName: 'Lindsay', lastName: 'Walton', email: 'lindsay.walton@example.com',userName:'lindy1',
        role: 'Member' },
    // More people...
]

export default function UsersTable() {
    const [users, setUsers] = useState(initialUsers);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleAddOrUpdateUser = (userData) => {
        if (currentUser) {
            // Update existing user from table
            setUsers(users.map(user => user.userId === currentUser.userId ? {...user, ...userData} : user));
        } else {
            // Add user to users table
            setUsers([...users, userData]);
        }
        closeModal();
    };

    const handleDeleteUser = (userId) => {
        setUsers(users.filter(user => user.userId !== userId));
    };

    const openModalForEdit = (user) => {
        setCurrentUser(user);
        setModalOpen(true);
    };

    const openModalForAdd = () => {
        setCurrentUser(null);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentUser(null);
    };

    return (
        <div className="bg-gray-900 h-full py-10">
            <div className="mx-auto max-w-7xl">

                {/*Table Header Text*/}
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-white">Users</h1>
                        <p className="mt-2 text-sm text-gray-300">
                            A list of all the users in your account including their name, title, email, username
                            and role.
                        </p>
                    </div>

                    {/*Add User Button*/}
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm
                            font-semibold text-white hover:bg-indigo-400 focus-visible:outline
                            focus-visible:outline-2 focus-visible:outline-offset-2
                            focus-visible:outline-indigo-500"
                            onClick = {openModalForAdd}
                        >
                            Add user
                        </button>
                    </div>
                </div>

                {/*Table headings*/}
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
                        <th scope="col" className="px-3 py-3.5 text-left text-sm
                                    font-semibold text-white">
                            UserID
                        </th>
                        <th scope="col" className="py-2 pl-4 pr-8 text-left text-sm
                                    font-semibold text-white sm:pl-0">
                            First Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm
                                    font-semibold text-white">
                            Last Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm
                                    font-semibold text-white">
                            Email
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm
                                    font-semibold text-white">
                            Username
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm
                                    font-semibold text-white">
                            Role
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>

                    {/*Table elements*/}
                    <tbody className="divide-y divide-gray-800">
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm
                                text-gray-300">
                                {user.userId}
                            </td>

                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium
                                text-gray-300 sm:pl-0">
                                {user.firstName}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm
                                text-gray-300">
                                {user.lastName}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm
                                text-gray-300">
                                {user.email}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm
                                text-gray-300">
                                {user.userName}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm
                                text-gray-300">
                                {user.role}
                            </td>

                            {/*Edit User Button*/}
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                                <button onClick={() => openModalForEdit(user)}
                                        className="text-indigo-400 hover:text-indigo-300">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}

                    {/*Submit and Close button handling for modal*/}
                    {isModalOpen && (
                        <ModalLayout onClose={closeModal}>
                            <UserForm user={currentUser}
                                      onSubmit={handleAddOrUpdateUser}
                                      onDelete={handleDeleteUser}
                                      onClose={closeModal}/>
                        </ModalLayout>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
