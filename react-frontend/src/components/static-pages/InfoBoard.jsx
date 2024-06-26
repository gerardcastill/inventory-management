export default function InfoBoard() {
    return (
        <div className="bg-gray-700 py-20 h-full w-full">
            <div className="z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Welcome to the IMS Dashboard!</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        In the future this dashboard will include updates to inventory and orders made by other
                        users in your organization. This dashboard will also include recommendations to visit future
                        components that will assist in tracking metrics involving inventory and orders.
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        To access current functions in IMS v1.0 click on the modules that are accessible on the sidebar.
                    </p>
                    <h3 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-2xl">
                        Updates scheduled for IMS v2.0 include:
                    </h3>
                    <ul>
                        <p className="mt-6 text-lg leading-8 text-gray-300"> - Authentication Layer</p>
                        <p className="text-lg leading-8 text-gray-300"> - Security Layers</p>
                        <p className="text-lg leading-8 text-gray-300"> - Dashboard Update</p>
                        <p className="text-lg leading-8 text-gray-300"> - Client Module</p>
                        <p className="text-lg leading-8 text-gray-300"> - Accounting Module</p>
                        <p className="text-lg leading-8 text-gray-300"> - Order and Inventory Metrics</p>
                        <p className="text-lg leading-8 text-gray-300"> - Using Next.js framework instead of CRA</p>
                    </ul>

                </div>
            </div>
        </div>
    )
}