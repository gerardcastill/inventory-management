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
              <Route path='/' element={<HomePage/>} />
              <Route path='/about' element={<AboutPage/>} />
              <Route path='/dashboard' element={<DashboardPage/>} />
              <Route path='/users' element={<UsersPage/>} />
              <Route path='/inventory' element={<InventoryPage/>} />
              <Route path='/orders' element={<OrdersPage/>} />
          </Routes>
      </Router>
  );
}

export default App;
