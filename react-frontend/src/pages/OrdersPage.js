import React from 'react';
import {OrderProvider} from "../contexts/OrderContext";
import OrdersTable from "../components/tables/OrderTable";
import SidebarLayout from "../components/layouts/SidebarLayout";


function OrdersPage() {
    return (
        <SidebarLayout>
            <OrderProvider>
                <OrdersTable />
            </OrderProvider>
        </SidebarLayout>
    );
}

export default OrdersPage;