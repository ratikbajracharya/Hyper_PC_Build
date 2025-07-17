import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PrebuiltPC from "./pages/PrebuiltPC";
import Monitors from "./pages/Monitors";
import ComponentsPage from "./pages/Components";
import Laptops from "./pages/Laptops";
import Accessories from "./pages/Accessories";
import BuildMyPC from "./pages/BuildMyPC";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without Navbar */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/reg" element={<RegisterPage />} />

        {/* Routes wrapped with Layout (Navbar + Outlet) */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/prebuilt-pc" element={<PrebuiltPC />} />
          <Route path="/monitors" element={<Monitors />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/build-my-pc" element={<BuildMyPC />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
