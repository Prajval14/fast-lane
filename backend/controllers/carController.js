const Car = require('../models/carModel');

// Get all cars
exports.getAllCars = async (req, res) => {
    console.log('1');
    try {
        const cars = await Car.find({});
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single car by id
exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a car
exports.createCar = async (req, res) => {
    console.log(req);
    try {
        let imagePaths = req.files.map(file => `${file.path.replace(/\\/g, '/')}`); // Map through files and collect paths
        const newCar = new Car({
            ...req.body,
            images: imagePaths // Save image paths in the database
        });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a car
exports.updateCar = async (req, res) => {
    try {
        const updates = { ...req.body };
        if (req.files && req.files.length > 0) {
            updates.images = req.files.map(file => file.path);
        }
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, updates, { new: true });

        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a car
exports.deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) return res.status(404).json({ message: 'Car not found' });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};