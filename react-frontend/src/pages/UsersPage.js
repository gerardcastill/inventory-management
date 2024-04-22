import React from 'react';
import {UserProvider} from "../contexts/UserContext";
import UsersTable from "../components/tables/UsersTable";
import SidebarLayout from "../components/layouts/SidebarLayout";

function UsersPage() {
    return (
        <SidebarLayout>
            <UserProvider>
                <UsersTable />
            </UserProvider>
        </SidebarLayout>
    );
}

export default UsersPage;