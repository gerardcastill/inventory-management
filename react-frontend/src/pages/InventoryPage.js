import React from 'react';
import {InventoryProvider} from "../contexts/InventoryContext";
import InventoryTable from "../components/tables/InventoryTable";
import SidebarLayout from "../components/layouts/SidebarLayout";


function InventoryPage() {
    return (
        <SidebarLayout>
            <InventoryProvider>
                <InventoryTable />
            </InventoryProvider>
        </SidebarLayout>
    );
}

export default InventoryPage;
