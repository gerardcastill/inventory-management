import { useState } from "react";

export default function UserSelector({ users, onSelectUser }) {
    const [selectedUserId, setSelectedUserId] = useState('');

    const handleUserChange = (e) => {
        const id = e.target.value;
        setSelectedUserId(id);

        // Check if a valid user is selected
        if (id) {
            const user = users.find(u => u.id === id);
            if (user) {
                const fullName = `${user.firstName} ${user.lastName}`;
                onSelectUser(fullName);
            }
        } else {
            onSelectUser('');  // Reset the selected user if "Select User" is chosen
        }
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
