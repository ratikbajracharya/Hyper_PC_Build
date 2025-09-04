import { Routes, Route } from "react-router-dom";

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
import Wishlist from "./pages/Wishlist";
import Bag from "./pages/Bag";
import Layout from "./components/Layout";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/reg" element={<RegisterPage />} />

      {/* Pages with Navbar */}
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/prebuilt-pc" element={<PrebuiltPC />} /> {/* Keep hyphen */}
        <Route path="/monitors" element={<Monitors />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/build-my-pc" element={<BuildMyPC />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
