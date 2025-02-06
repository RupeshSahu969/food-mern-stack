const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// MongoDB Connection URL
const mongoURL = "mongodb+srv://rupeshkumarsahu81034:rupesh@cluster0.gwsa2.mongodb.net/food?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const fetchedData = mongoose.connection.db.collection("food_item");
        const foodCategory = mongoose.connection.db.collection("foodCategory");

        const foodItems = await fetchedData.find({}).toArray();
        const foodCategories = await foodCategory.find({}).toArray();

        global.food_item = foodItems;
        global.foodCategory = foodCategories;

        console.log("Fetched food items and categories successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

// Middleware
app.use(cors()); // Allows Cross-Origin Requests
app.use(express.json()); // Parses JSON Request Bodies

// Routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// Test Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Connect to MongoDB
mongoDB();
