import React from 'react';
import UsersTable from "../components/tables/UsersTable";
import SidebarLayout from "../components/layouts/SidebarLayout";

function UsersPage() {
    return (
        <SidebarLayout>
            <UsersTable />
        </SidebarLayout>
    );
}

export default UsersPage;