import React from 'react';
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import "../layouts/SidebarLayout.css";

const SidebarLayout = ({ children }) => {
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <div className="content-area" >
                    {children}
                </div>
                <Footer className="footer"/>
            </div>
        </div>
    );
}

export default SidebarLayout;