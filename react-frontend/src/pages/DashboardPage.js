import React from 'react';
import InfoBoard from "../components/static-pages/InfoBoard";
import SidebarLayout from "../components/layouts/SidebarLayout";

function DashboardPage() {
    return (
        <SidebarLayout>
            <InfoBoard />
        </SidebarLayout>
    );
}

export default DashboardPage;