import React from "react";
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage.js";
import OrdersPage from "./pages/OrdersPage.js";
import UsersPage from "./pages/UsersPage.js";


function App() {
  return (
      <Router>

                  <Routes>
                      < Route path = '/' exact element = {<HomePage/>} />
                      < Route path = '/about' exact element = {<AboutPage/>} />
                      < Route path = '/dashboard' exact element = {<DashboardPage/>} />
                      < Route path = '/users' exact element = {<UsersPage/>} />

                      < Route path = '/inventory' exact element = {<InventoryPage/>} />

                      < Route path = '/orders' exact element = {<OrdersPage/>} />


                  </Routes>

      </Router>
  );
}

export default App;
