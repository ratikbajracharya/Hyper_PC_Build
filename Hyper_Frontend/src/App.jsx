import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { BuildProvider } from "./components/BuildContext";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PrebuiltPC from "./pages/PrebuiltPC";
import Monitors from "./pages/Monitors";
import ComponentsPage from "./pages/Components";
import Laptops from "./pages/Laptops";
import Accessories from "./pages/Accessories";
import BuildMyPC from "./pages/BuildMyPC";
import Profile from "./pages/Profile";
import SavedBuilds from "./pages/SavedBuilds";
import Bag from "./pages/Bag";
import Checkout from "./pages/Checkout";

// Layout + Search
import Layout from "./components/Layout";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <BuildProvider>
      <Routes>

        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reg" element={<RegisterPage />} />

        {/* ===== PROTECTED ROUTES (With Navbar Layout) ===== */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/prebuilt-pc" element={<PrebuiltPC />} />
          <Route path="/monitors" element={<Monitors />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/build-my-pc" element={<BuildMyPC />} />
          <Route path="/profile" element={<Profile />} />

          {/* SAVED BUILDS */}
          <Route path="/saved-builds" element={<SavedBuilds />} />

          {/* Auto-redirect for mistyped URL (fix for your error) */}
          <Route path="/Saved Builds" element={<Navigate to="/saved-builds" />} />
          <Route path="/SavedBuilds" element={<Navigate to="/saved-builds" />} />
          <Route path="/Saved_Builds" element={<Navigate to="/saved-builds" />} />

          {/* Cart + Checkout */}
          <Route path="/bag" element={<Bag />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Search */}
          <Route path="/search" element={<SearchResults />} />
        </Route>

        {/* Catch-all: Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </BuildProvider>
  );
}

export default App;
