// Importing necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const carRoutes = require('./routes/carRoutes');

// Initialize the express application
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
  {
    origin: ["https://fast-lane-frontend.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
  }  
));
// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose.connect('mongodb+srv://prajval1420:znDPSV3LU3wjC64m@cluster0.opwfq.mongodb.net/carDealership?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the MongoDB');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});

// Routes
//app.use('/api/cars', carRoutes);
app.get("/", (req,res) => {
  res.json("Hello");
})
      
// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
