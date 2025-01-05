import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../css/addcarpage.css'

const CreateCarPage = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    kms: "",
    vin: "",
    price: "",
  });
  const [images, setImages] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // debugger;
      axios.get(`http://localhost:3000/api/cars/${id}`)
        .then(response => {
          setCarData(response.data);
        })
        .catch(error => console.error('Failed to fetch car data', error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files); 
    const filesArray = Array.from(e.target.files);
    // setImages(e.target.files);
    filesArray.sort((a, b) => a.name.localeCompare(b.name));
    // console.log(filesArray); 
    setImages(filesArray);
  };

  const handleSubmit = async (e) => {
    // debugger
    e.preventDefault();
    const formData = new FormData();
    Object.keys(carData).forEach((key) => formData.append(key, carData[key]));
    images.forEach((file) => formData.append("images", file));

    try {
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof Blob ? value.name : value}`);
      }
      const url = id ? `http://localhost:3000/api/cars/${id}` : "http://localhost:3000/api/cars";
      const method = id ? 'put' : 'post';
      await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setModalMessage(id ? "Car updated successfully!" : "Car added successfully!");
      setModalVisible(true);
    } catch (error) {
      console.error(error);
      setModalMessage("Failed to process request.");
      setModalVisible(true);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/cars/${id}`);
      setModalMessage("Car deleted successfully!");
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to delete car', error);
      setModalMessage("Failed to delete car.");
      setModalVisible(true);
    }
  };

  const handleClose = () => {
    if (modalMessage === "Car updated successfully!" || modalMessage === "Car added successfully!" || modalMessage === "Car deleted successfully!") {
      navigate('/products');
    } else {
      setModalVisible(false);
    }
  };

  return (
    <div className="container-fluid m-0 p-0" style={{
      backgroundImage: 'url("https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$IPB2,$PN01,$MT356&view=STUD_INTERIOR&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&overlay=0&")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Navbar currentPage="addupdatecar" />
      <div className="container mt-5">
        <div className="shadowed-box mb-4">
          <h2 className="text-center mb-4">{id ? "Update Car Details" : "Add a New Car"}</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Car Details */}
            <div className="mb-3">
              <label className="form-label">Make</label>
              <input
                type="text"
                className="form-control"
                name="make"
                value={carData.make}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Model</label>
              <input
                type="text"
                className="form-control"
                name="model"
                value={carData.model}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Year</label>
              <input
                type="number"
                className="form-control"
                name="year"
                value={carData.year}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Color</label>
              <input
                type="text"
                className="form-control"
                name="color"
                value={carData.color}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">KMS</label>
              <input
                type="number"
                className="form-control"
                name="kms"
                value={carData.kms}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">VIN</label>
              <input
                type="text"
                className="form-control"
                name="vin"
                value={carData.vin}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={carData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Upload Images</label>
              <input
                type="file"
                className="form-control"
                name="images"
                multiple
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-dark rounded-pill">
              {id ? "Update Details" : "Submit"}
            </button>
            {id && (
              <button type="button" className="btn btn-danger rounded-pill ms-2" onClick={handleDelete}>
                Delete Car
              </button>
            )}
          </form>
        </div>
      </div>

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
                <h5 className="modal-title">Status</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CreateCarPage;