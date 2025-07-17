import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reg" element={<RegisterPage />} />

       
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/prebuilt-pc" element={<PrebuiltPC />} />
          <Route path="/monitors" element={<Monitors />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/build-my-pc" element={<BuildMyPC />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/bag" element={<Bag />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
