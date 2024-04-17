import {useState} from "react";

export default function ProductSelector({ products, onAddProduct }) {
    const [selectedProductId, setSelectedProductId] = useState('');

    const handleAddProduct = () => {
        if (!selectedProductId) {
            alert("Please select a product first!");
            return;
        }
        const product = products.find(p => p.productId === selectedProductId);
        if (product) {
            onAddProduct({
                productId: product.productId,
                productName: product.productName,
                quantityAvailable: product.quantityAvailable,
                quantityPending: product.quantityPending,
                price: product.price
            });
        }
    };

    return (
        <div className="mt-6 flex items-center justify-start gap-x-3">
            <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="block w-5/12 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                    ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                    sm:text-sm sm:leading-6 [&_*]:text-black"
            >
                <option value="">Select a Product</option>
                {products.map(product => (
                    <option key={product.productId} value={product.productId}>
                        {product.productName}
                    </option>
                ))}
            </select>
            <button type="button" onClick={handleAddProduct}
                    className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm
                            hover:bg-indigo-600">
                Add Product
            </button>
        </div>
    );
}
