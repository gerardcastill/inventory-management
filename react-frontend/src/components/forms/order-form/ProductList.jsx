import {useEffect, useState} from "react";

export default function ProductList({ products, onProductChange }) {

    // State to hold initial and adjusted products
    const [editableProducts, setEditableProducts] = useState(products.map(product => ({
        ...product,
        initialQuantityOrdered: product.quantityOrdered || 0, // Track the initial ordered quantity
    })));

    // Effect to reset editableProducts when products prop changes (e.g., when switching orders)
    useEffect(() => {
        setEditableProducts(products.map(product => ({
            ...product,
            initialQuantityOrdered: product.quantityOrdered || 0,
        })));
    }, [products]);

    const handleInputChange = (index, newQuantityOrdered) => {
        newQuantityOrdered = Number(newQuantityOrdered); // Ensure the input is treated as a number

        const updatedProducts = editableProducts.map((product, idx) => {
            if (idx === index) {
                const previousQuantityOrdered = Number(product.quantityOrdered) || 0; // Convert previous quantity to number
                const quantityDifference = newQuantityOrdered - previousQuantityOrdered;

                // Adjust available and pending based on the new order quantity
                return {
                    ...product,
                    quantityOrdered: newQuantityOrdered,
                    quantityAvailable: Number(product.quantityAvailable) - quantityDifference, // Convert and adjust available quantity
                    quantityPending: Number(product.quantityPending || 0) + quantityDifference, // Convert and adjust pending quantity
                };
            }
            return product;
        });

        setEditableProducts(updatedProducts);
        onProductChange(updatedProducts);
    };

    const handleDeleteProduct = (index, event) => {
        event.preventDefault();
        event.stopPropagation();
        const updatedProducts = editableProducts.filter((_, idx) => idx !== index);
        setEditableProducts(updatedProducts);
        onProductChange(updatedProducts);
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
                {products.map((product, index) => (
                    <tr key={index}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-white">{product.productId}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-white">{product.productName}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                            <input
                                type="number"
                                min="0"
                                max={product.quantityAvailable + (product.quantityOrdered || 0)}
                                value={product.quantityOrdered || 0}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className="text-sm p-2 bg-gray-800 text-center text-white rounded-md w-20"
                            />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-center text-white">{product.quantityAvailable}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center text-white">{product.quantityPending}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center text-white">{product.price}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-center text-white">
                            <button
                                onClick={(e) => handleDeleteProduct(index,e)}
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
