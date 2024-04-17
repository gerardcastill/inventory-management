import { useState } from "react";

export default function ClientSelector({ clients, onSelectClient }) {
    const [selectedClientId, setSelectedClientId] = useState('');

    const handleClientChange = (e) => {
        const clientId = e.target.value;
        setSelectedClientId(clientId);

        // Check if a valid client is selected
        if (clientId) {
            const client = clients.find(u => u.clientId === clientId);
            if (client) {
                const fullName = `${client.firstName} ${client.lastName}`;
                onSelectClient(fullName);
            }
        } else {
            onSelectClient('');  // Reset the selected client if "Select Client" is chosen
        }
    };

    return (
        <div className="mt-2">
            <select
                value={selectedClientId}
                onChange={handleClientChange}
                className="block w-10/12 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
            >
                <option value="">Select a Client</option>
                {clients.map(client => (
                    <option key={client.clientId} value={client.clientId}>
                        {client.firstName} {client.lastName} - {client.company}
                    </option>
                ))}
            </select>
        </div>
    );
}