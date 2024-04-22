import {useEffect, useState} from "react";

export default function ClientSelector({ clients, onSelectClient, selectedClient }) {
    const [selectedClientName, setSelectedClientName] = useState('');

    // Initialize the selected client when the component mounts or when selectedClient changes
    useEffect(() => {
        setSelectedClientName(selectedClient || '');
    }, [selectedClient]);

    const handleClientChange = (e) => {
        const clientName = e.target.value;
        setSelectedClientName(clientName);

        // Update the parent component state
        onSelectClient(clientName);
    };

    return (
        <div className="mt-2">
            <select
                value={selectedClientName}
                onChange={handleClientChange}
                className="block w-10/12 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6"
            >
                <option value="">Select a Client</option>
                {clients.map(client => (
                    <option key={client.clientName} value={client.clientName}>
                        {client.clientName} - {client.company}
                    </option>
                ))}
            </select>
        </div>
    );
}