const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("🎯 Welcome to Budget Tracker!");
  console.log("🎯 Welcome to Budget");
});

module.exports = app;
