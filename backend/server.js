const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const eventRegRoutes = require("./routes/eventRegRoute");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));


// Test API Route
app.get("/", (req, res) => {
  res.send({ message: "MERN Backend is Running!" });
});

// Example API Route to Test with Postman
app.post("/test", (req, res) => {
  console.log("Received data:", req.body);
  res.json({ message: "Data received", data: req.body });
});

app.use("/api/events", eventRegRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

 
