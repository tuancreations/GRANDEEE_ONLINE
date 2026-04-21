import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ShopDetail from "./pages/ShopDetail";
import AllShops from "./pages/AllShops";
import SellerDashboard from "./pages/SellerDashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>

          {/* Marketplace shell */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="shops" element={<AllShops />} />
            <Route path="shop/:id" element={<ShopDetail />} />
            <Route path="seller/dashboard" element={<SellerDashboard />} />
          </Route>

          {/* Auth Pages (No Header) */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
