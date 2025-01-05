// LandingPage.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../css/main.css";
import lambo from "../images/cars/lambo.avif";
import cybertruck from "../images/cars/cybertruck.jpeg";
import benz from "../images/logo/benz.png";
import bmw from "../images/logo/bmw.png";
import ferrari from "../images/logo/ferrari.png";
import lambo2 from "../images/logo/lambo.png";
import porsche from "../images/logo/porsche.png";
import tesla from "../images/logo/tesla.png";

const LandingPage = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fast-lane-ivory.vercel.app/api/cars")
      .then((response) => {
        const allCars = response.data;

        // Select up to 4 random cars
        const randomCars = allCars
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        setCars(randomCars);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  return (
    <div className="container-fluid m-0 p-0">
      <Navbar currentPage="landing" />

      {/* Hero Section */}
      <div className="container row1_col1 py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 text-center text-lg-end">
            <h2>Find Your Dream</h2>
            <div className="d-flex align-items-center justify-content-center justify-content-lg-end">
              <h1 className="fw-bold ps-2">CAR</h1>
              <button
                type="button"
                className="btn btn-dark rounded-pill ms-4"
                onClick={() => navigate("/products")}
              >
                Order Now
                <i className="bi bi-caret-right-fill ps-2"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 text-center">
            <img src={lambo} alt="Lamborghini car" className="img-fluid" />
          </div>
        </div>
      </div>

      {/* EV Section */}
      <div className="row1_col2 py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 order-lg-1 order-2">
            <img
              src={cybertruck}
              alt="Tesla Cybertruck"
              className="img-fluid rounded-end"
            />
          </div>
          <div className="col-lg-6 col-md-12 order-lg-2 order-1 text-center text-lg-start px-5">
            <h1 className="fw-bold ps-2">EVs for everyone</h1>
            <p className="ps-2">
              We provide many of the best services for you and you will get the
              best benefits here.
            </p>
            <button
              type="button"
              className="btn btn-dark rounded-pill mt-3 ev-button"
              onClick={() => navigate("/products")}
            >
              Book an EV
              <i className="bi bi-lightning-charge-fill ps-2"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <div className="container text-center mt-5">
        <hr className="line" />
        <h2 className="d-inline-block mx-3">Brands</h2>
        <hr className="line" />
      </div>
      <div className="row text-center mx-5 py-5 opacity-75">
        {[porsche, lambo2, bmw, benz, tesla, ferrari].map((logo, index) => (
          <div className="col-4 col-md-2 mb-3" key={index}>
            <img src={logo} alt="Car brand logo" className="img-fluid w-75" />
          </div>
        ))}
      </div>

      {/* Explore Section */}
      <div className="container text-center mt-5">
        <hr className="line" />
        <h2 className="d-inline-block mx-3">Explore</h2>
        <hr className="line" />
      </div>

      <div className="container-fluid mt-5 row1_col2">
        {/* Car Cards Section */}
        <div className="row g-4 px-4">
          {cars.map((car, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="card h-100">
                <img
                  src={`https://fast-lane-ivory.vercel.app/${car.images[0]}`}
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
                    onClick={() => navigate("/products")}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mt-5" id="contact-us">
        <div className="row">
          <div className="col-lg-6 text-start d-flex flex-column justify-content-center">
            <h1 className="fw-bold">Contact Us</h1>
            <p>
              <i className="bi bi-telephone-fill pe-2"></i>123-456-789
            </p>
            <p>
              <i className="bi bi-envelope-fill pe-2"></i>fastlane@gmail.com
            </p>
            <p>
              <i className="bi bi-geo-alt-fill pe-2"></i>Toronto, ON
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <iframe
              className="rounded w-100"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26659.69039480484!2d-79.39245757756805!3d43.629487838324614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON!5e1!3m2!1sen!2sca!4v1733519800548!5m2!1sen!2sca"
              height="350"
              loading="lazy"
              title="Map of Toronto"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
