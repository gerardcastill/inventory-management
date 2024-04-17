import React from "react";
import LandingPage from "../components/static-pages/LandingPage.jsx";
import NavbarLayout from "../components/layouts/NavbarLayout";

function HomePage() {
    return (
        <NavbarLayout>
            <LandingPage />
        </NavbarLayout>
    );
}

export default HomePage;