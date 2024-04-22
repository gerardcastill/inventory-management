export default function ProductList({ orderDetails, onQuantityChange, onDeleteProduct }) {

    const handleInputChange = (productId, value) => {
        const detail = orderDetails.find(detail => detail.productId === productId);
        if (!detail) return; // Exit if no product detail is found

        // Convert the input value to a number; default to 0 if it's NaN
        const newQuantityInput = parseInt(value, 10);
        const newQuantityOrdered = isNaN(newQuantityInput) ? 0 : newQuantityInput;

        const previousQuantityOrdered = detail.quantityOrdered || 0;
        const quantityDifference = newQuantityOrdered - previousQuantityOrdered;

        // Calculate the potential new available quantity
        const potentialNewAvailable = detail.quantityAvailable - quantityDifference;

        // Only update if there's an actual change in quantity
        if (potentialNewAvailable >= 0) {
            // Update local state with new quantities
            onQuantityChange(productId, newQuantityOrdered, quantityDifference);
        } else {
            // Optionally show a message or handle the error
            console.error("Cannot order more than available stock");
        }
    };

    const handleDeleteProduct = (productId) => {
        onDeleteProduct(productId)
    };

    return (
        <div className="mt-2">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                <tr>
                    <th scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Product ID
                    </th>
                    <th scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Product Name
                    </th>
                    <th scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Qty. Ordered
                    </th>
                    <th scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-white uppercase">
                        Qty. Available
                    </th>
                    <th scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-white uppercase">
                        Qty. Pending
                    </th>
                    <th scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-white uppercase">
                        Price Per Unit
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-white uppercase">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                {orderDetails.map((detail) => (
                    <tr key={detail.productId}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-white">{detail.productId}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-white">{detail.productName}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                            <input
                                type="number"
                                min="0"
                                max={detail.quantityAvailable + (detail.quantityOrdered || 0)}
                                value={detail.quantityOrdered}
                                onChange={(e) => handleInputChange(detail.productId, e.target.value)}
                                className="text-sm p-2 bg-gray-800 text-center text-white rounded-md w-20"
                            />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-center text-white">{detail.quantityAvailable}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center text-white">{detail.quantityPending}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center text-white">${parseFloat(detail.price).toFixed(2)}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center text-white">
                            <button
                                onClick={(e) => handleDeleteProduct(detail.productId)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
