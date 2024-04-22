import {useEffect, useState} from "react";

export default function UserSelector({ users, selectedUser, onSelectUser }) {
    const [selectedUserId, setSelectedUserId] = useState(selectedUser ||'');

    useEffect(() => {
        setSelectedUserId(selectedUser || '');
    }, [selectedUser]);

    const handleUserChange = (e) => {
        const userId = e.target.value;
        setSelectedUserId(userId);
        onSelectUser(userId); // Pass the userId to the OrderForm
    };

    return (
        <div className="mt-2">
            <select
                value={selectedUserId}
                onChange={handleUserChange}
                className="block w-10/12 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
            >
                <option value="">Select a User</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} - {user.role}
                    </option>
                ))}
            </select>
        </div>
    );
}
