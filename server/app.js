const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const plaidRoutes = require('./routes/plaidRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", transactionRoutes)
app.use("/api/plaid", plaidRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to Budget Tracker!");
  
});

module.exports = app;
