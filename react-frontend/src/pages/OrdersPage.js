import React from 'react';
import OrdersTable from "../components/tables/OrderTable";
import SidebarLayout from "../components/layouts/SidebarLayout";


function OrdersPage() {
    return (
        <SidebarLayout>
            <OrdersTable />
        </SidebarLayout>
    );
}

export default OrdersPage;