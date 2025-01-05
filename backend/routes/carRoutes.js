const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const upload = require('./multerConfig');

router.get('/', (req, res) => {
    console.log("Fetching all cars");
    carController.getAllCars(req, res);
});
router.get('/:id', carController.getCar);
router.post('/', upload, carController.createCar);
router.put('/:id', upload, carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;
