const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const eventRegRoutes = require("./routes/eventRegRoute");

dotenv.config();
const {
  authRoutes,
  userRoutes,
  organizationRoutes,
  crewRoutes,
} = require("./routes");

const logger = require("./utils/logger");

const app = express();

// Middleware for logging (using the logger)
app.use((req, res, next) => {
  logger.info(`${req.method} request to ${req.url}`);
  next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error("MongoDB connection error:", err));

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/organizations",organizationRoutes);
app.use("/api/crews",crewRoutes)
app.use("/api/events", eventRegRoutes);


module.exports = app;
