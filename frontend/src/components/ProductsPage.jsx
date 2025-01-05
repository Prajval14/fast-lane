import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../css/products.css";

const ProductsPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [kmsFilter, setKmsFilter] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  // Fetch cars from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cars")
      .then((response) => {
        setCars(response.data);
        setFilteredCars(response.data); // Initially show all cars
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  // Handle Filtering
  const handleFilter = () => {
    let updatedCars = [...cars];

    if (priceFilter) {
      updatedCars = updatedCars.filter((car) => car.price <= parseInt(priceFilter));
    }

    if (kmsFilter) {
      updatedCars = updatedCars.filter((car) => car.kms <= parseInt(kmsFilter));
    }

    if (updatedCars.length === 0) {
      setShowModal(true);
    }
    else {
      setFilteredCars(updatedCars);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar currentPage="products" />
      <div className="container flex-grow-1">
        {/* Filter Section */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-6 mt-2">
            <div className="d-flex align-items-center shadow-sm p-3 rounded-pill">
              {/* Max Price Input */}
              <div className="me-3 flex-grow-1">
                <input
                  type="number"
                  id="priceFilter"
                  className="form-control border-1 rounded-pill"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  placeholder="Enter max price"
                />
              </div>

              {/* Max KMs Input */}
              <div className="me-3 flex-grow-1">
                <input
                  type="number"
                  id="kmsFilter"
                  className="form-control border-1 rounded-pill"
                  value={kmsFilter}
                  onChange={(e) => setKmsFilter(e.target.value)}
                  placeholder="Enter max kilometers"
                />
              </div>

              {/* Apply Filters Button */}
              <div>
                <button
                  type="button"
                  className="btn btn-light rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "40px", height: "40px" }}
                  onClick={handleFilter}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Car Cards Section */}
        <div className="row g-4 py-3">
          {filteredCars.map((car, index) => (
            <div className="col-md-3" key={index}>
              <div className="card shadow-sm border-0">
                <img
                  src={`http://localhost:3000/${car.images[0]}`}
                  className="card-img-top"
                  alt={car.model}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {car.make} {car.model}
                  </h5>
                  <p className="card-text">Model Year: {car.year}</p>
                  <p className="card-text">Price: ${car.price}</p>
                  <p className="card-text">KMS Driven: {car.kms}</p>
                  <button
                    type="button"
                    className="btn btn-dark rounded-pill"
                    onClick={() => navigate(`/car-details/${car._id}`)}
                  >
                    View Car Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Bootstrap Modal */}
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{ display: showModal ? "block" : "none" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">No Results Found</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>No cars match your filter criteria. Please try again with different values.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;