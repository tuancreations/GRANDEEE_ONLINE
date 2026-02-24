import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

import MainLayout from "./layouts/MainLayout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ShopDetail from "./pages/ShopDetail";
import AllShops from "./pages/AllShops";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>

          {/* Landing Page (No Header) */}
          <Route path="/" element={<Landing />} />

          {/* Auth Pages (No Header) */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Marketplace Pages (With Header, protected by MainLayout) */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/shops" element={<AllShops />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
          </Route>

        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
