import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const bootstrap = require("bootstrap");
    axios
      .get(`http://localhost:3000/api/cars/${id}`)
      .then((response) => {
        setCar(response.data);
        const carouselElement = document.getElementById("carImagesCarousel");
        if (carouselElement) {
          new bootstrap.Carousel(carouselElement, {
            interval: 3000,
            ride: "carousel",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
      });
  }, [id]);

  // Lease/Finance calculator
  const calculateMonthlyPayment = (price, months, rate) => {
    const monthlyRate = rate / 12 / 100;
    return ((price * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))).toFixed(2);
  };

  return (
    <div className="container-fluid m-0 p-0">
      <Navbar currentPage="cardetail" id={id} />
      <div className="row m-0 p-0 mb-5">
        {/* Left Column: Carousel */}
        <div className="col-md-8 p-0">
          {car ? (
            <div
              id="carImagesCarousel"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {car.images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={`http://localhost:3000/${image}`}
                      className="d-block w-100"
                      alt={`${car.make} ${car.model} - ${index + 1}`}
                      style={{ objectFit: "cover", height: "100%" }}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carImagesCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carImagesCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          ) : (
            <p>Loading images...</p>
          )}
        </div>

        {/* Right Column: Car Details and Calculator */}
        <div className="col-md-4 p-5">
          {car ? (
            <div>
              {/* Car Title */}
              <h2 className="text-center mb-4 fw-bold pb-3">{car.year} {car.make} {car.model}</h2>

              {/* Single-Line Layout for Car Details */}
              <div className="row text-center mb-4">
                <div className="col">
                  <h4>${car.price}</h4>
                  <p>Price</p>
                </div>
                <div className="col">
                  <h4>{car.kms} km</h4>
                  <p>KMs</p>
                </div>
                <div className="col">
                  <h4>{car.vin}</h4>
                  <p>VIN #</p>
                </div>
              </div>

              <hr />

              {/* Lease/Finance Calculator */}
              <h4>Lease/Finance Calculator</h4>
              <div className="mb-3">
                <label>Lease/Finance Term (Months):</label>
                <select
                  className="form-select"
                  onChange={(e) =>
                    setCar((prevCar) => ({
                      ...prevCar,
                      term: e.target.value,
                    }))
                  }
                >
                  <option value={36}>36 months</option>
                  <option value={48}>48 months</option>
                  <option value={60}>60 months</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Interest Rate (%):</label>
                <input
                  type="number"
                  className="form-control"
                  defaultValue={5}
                  onChange={(e) =>
                    setCar((prevCar) => ({
                      ...prevCar,
                      rate: e.target.value,
                    }))
                  }
                />
              </div>
              <p>
                Monthly Payment: $
                {calculateMonthlyPayment(
                  car.price,
                  car.term || 36,
                  car.rate || 5
                )}
              </p>

              <button
                type="button"
                className="btn btn-dark rounded-pill mt-3"
                onClick={() => setModalVisible(true)}
              >
                Order Now
              </button>

              {/* Bootstrap Modal */}
              {modalVisible && (
                <div
                  className="modal fade show"
                  tabIndex="-1"
                  style={{ display: "block" }}
                  role="dialog"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Booking Confirmation</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setModalVisible(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>Your car has been successfully booked!</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setModalVisible(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>Loading car details...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarDetailsPage;