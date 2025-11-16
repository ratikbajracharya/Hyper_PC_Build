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
import BuildDetails from "./pages/BuildDetails";
import SavedBuilds from "./pages/SavedBuilds";
import Profile from "./pages/Profile";
import Bag from "./pages/Bag";
import Checkout from "./pages/Checkout";

// Layout + Search
import Layout from "./components/Layout";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <BuildProvider>
      <Routes>

        {/* ===== PUBLIC AUTH ROUTES ===== */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reg" element={<RegisterPage />} />

        {/* ===== LOGGED-IN ROUTES (WITH NAVBAR) ===== */}
        <Route element={<Layout />}>

          {/* Main navigation pages */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/prebuilt-pc" element={<PrebuiltPC />} />
          <Route path="/monitors" element={<Monitors />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/accessories" element={<Accessories />} />

          {/* Build PC */}
          <Route path="/build-my-pc" element={<BuildMyPC />} />

          {/* Saved Builds */}
          <Route path="/saved-builds" element={<SavedBuilds />} />
          <Route path="/saved-builds/:id" element={<BuildDetails />} />

          {/* Cart + Checkout */}
          <Route path="/bag" element={<Bag />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Search */}
          <Route path="/search" element={<SearchResults />} />
        </Route>

        {/* Redirect mis-typed URLs */}
        <Route path="/SavedBuilds" element={<Navigate to="/saved-builds" />} />
        <Route path="/Saved Builds" element={<Navigate to="/saved-builds" />} />

        {/* ===== CATCH-ALL ===== */}
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </BuildProvider>
  );
}

export default App;
