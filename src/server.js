const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
const mongoURI = "mongodb://127.0.0.1:27017/frontend";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a Mongoose schema for registration
const registrationSchema = new mongoose.Schema({
  Fullname: String,
  EmailID: String,
  Password: String,
  Photo: String,
  Gender: String,
  dob: Date,
  City: String,
  Area: String,
  ContactNumber: String,
});

// Create a model based on the schema
const Registration = mongoose.model("Registration", registrationSchema);

// Registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { Fullname, EmailID, Password, Photo, Gender, dob, City, Area, ContactNumber } = req.body;
    console.log("Received registration request:", { Fullname, EmailID, Password, Photo, Gender, dob, City, Area, ContactNumber });

    if (!Fullname || !EmailID || !Password || !Photo || !Gender || !dob || !City || !Area || !ContactNumber) {
      console.log("Validation failed: Missing required fields");
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Create a new registration document
    const registration = new Registration({
      Fullname,
      EmailID,
      Password,
      Photo,
      Gender,
      dob,
      City,
      Area,
      ContactNumber
    });

    // Save the document to the database
    const savedRegistration = await registration.save();

    console.log("Registration saved successfully:", savedRegistration);
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const skip = (page - 1) * limit;

    // Fetch all user data from the Registration collection and sort in descending order
    const users = await Registration.find({})
      .sort({ _id: -1 })  // Sort by _id in descending order
      .skip(skip)
      .limit(limit);

    const totalUsers = await Registration.countDocuments();

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.put("/api/updateCustomer/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const updatedCustomerData = req.body;

    // Perform the update operation in your database using mongoose
    const updatedCustomer = await Registration.findByIdAndUpdate(
      customerId,
      updatedCustomerData,
      { new: true } // Return the updated document
    );

    // Send the updated customer data in the response
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.delete("/api/deleteCustomer/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    console.log("Deleting customer with ID:", customerId);

    const deletedCustomer = await Registration.findOneAndDelete({ _id: customerId });

    if (!deletedCustomer) {
      console.log("Customer not found");
      return res.status(404).json({ message: "Customer not found" });
    }

    console.log("Customer deleted successfully:", deletedCustomer);
    res.status(200).json(deletedCustomer);
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
