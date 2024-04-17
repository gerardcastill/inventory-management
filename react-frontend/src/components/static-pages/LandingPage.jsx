import {ArrowPathRoundedSquareIcon, ClipboardDocumentListIcon, TruckIcon, UsersIcon} from "@heroicons/react/16/solid";

const cards = [
    {
        name: 'Inventory Management',
        description: 'Keep track of your product inventory including stock levels, product details, and supplier information.',
        icon: ClipboardDocumentListIcon,
    },
    {
        name: 'Order Management',
        description: 'Manage orders from creation to fulfillment, track order status, and handle order processing efficiently.',
        icon: ArrowPathRoundedSquareIcon,
    },
    {
        name: 'User Management',
        description: 'Maintain employee records, assign roles and permissions, and manage access to system functionalities.',
        icon: UsersIcon,
    },
]

export default function LandingPage() {
    return (
        <div className="absolute bg-gray-900 py-24 sm:py-32 w-full">
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Inventory Management
                        System</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        The Inventory Management System is a comprehensive solution designed to efficiently manage
                        inventory, orders, and employee information in a business environment. Built on a microservice
                        architecture, this system offers modularity, scalability, and flexibility to adapt to the
                        evolving needs of your organization.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-3 lg:gap-8">
                    {cards.map((card) => (
                        <div key={card.name}
                             className="flex gap-x-4 rounded-xl bg-white/10 p-6 ring-1 ring-inset ring-white/10">
                            <card.icon className="h-7 w-5 flex-none text-indigo-400" aria-hidden="true"/>
                            <div className="text-base leading-7">
                                <h3 className="font-semibold text-white">{card.name}</h3>
                                <p className="text-gray-300">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}