import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../images/logo/logo1.png";

const Navbar = ({ currentPage, id }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand me-auto" to="/">
                        <img src={logo1} alt="Fast Lane Motors logo" />
                    </Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {currentPage === "landing" && (
                            <>
                                <li className="nav-item ps-3">
                                    <Link to="/products" className="btn btn-dark rounded-pill">
                                        View Cars
                                    </Link>
                                </li>
                                <li className="nav-item ps-3">
                                    <a href="#contact-us" className="btn btn-dark rounded-pill">
                                        Contact Us
                                    </a>
                                </li>
                            </>
                        )}
                        {currentPage === "products" && (
                            <>
                                <li className="nav-item ps-3">
                                    <Link to="/add-car" className="btn btn-dark rounded-pill">
                                        Add New Car
                                    </Link>
                                </li>
                                <li className="nav-item ps-3">
                                    <Link to="/" className="btn btn-dark rounded-pill">
                                        Go Back
                                    </Link>
                                </li>
                            </>
                        )}
                        {currentPage === "cardetail" && (
                            <>
                                <li className="nav-item ps-3">
                                    <Link to={`/update-car/${id}`} className="btn btn-dark rounded-pill">Update Car</Link>
                                </li>
                                <li className="nav-item ps-3">
                                    <Link to="/products" className="btn btn-dark rounded-pill">
                                        Go Back
                                    </Link>
                                </li>
                            </>
                        )}
                        {currentPage === "addupdatecar" && (
                            <>
                                <li className="nav-item ps-3">
                                    <Link to="/products" className="btn btn-dark rounded-pill">
                                        Go Back
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;