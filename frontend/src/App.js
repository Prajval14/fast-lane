import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProductsPage from "./components/ProductsPage";
import AddUpdateCarPage from "./components/AddUpdateCarPage";
import CarDetailsPage from "./components/CarDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/car-details/:id" element={<CarDetailsPage />} />
        <Route path="/add-car" element={<AddUpdateCarPage />} />
        <Route path="/update-car/:id" element={<AddUpdateCarPage />} />
      </Routes>
    </Router>
  );
}

export default App;