import React from 'react';
import InventoryTable from "../components/tables/InventoryTable";
import SidebarLayout from "../components/layouts/SidebarLayout";


function InventoryPage() {
    return (
        <SidebarLayout>
            <InventoryTable />
        </SidebarLayout>
    );
}

export default InventoryPage;
