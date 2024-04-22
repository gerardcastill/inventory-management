import {useState} from "react";

export default function ProductSelector({ products, onAddProduct, selectedProductIds }) {
    const [selectedProductId, setSelectedProductId] = useState('');
    const availableProducts = products.filter(product => !selectedProductIds.includes(product.productId));
    const handleAddProduct = () => {
        const productToAdd = products.find(p => p.productId === parseInt(selectedProductId));
        if (productToAdd) {
            onAddProduct({
                ...productToAdd
            });
            setSelectedProductId(''); // Reset selection after adding
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
                {availableProducts.map(product => (
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
