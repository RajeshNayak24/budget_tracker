const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const mongoose = require("mongoose");
const plaidRoutes = require('./routes/plaidRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully 👍🏻!"))
  .catch((err) => console.log(err));


app.use("/api", authRoutes);
app.use("/api", transactionRoutes)
app.use("/api/plaid", plaidRoutes)

app.get("/", (req, res) => {
  res.send("🎯 Welcome to Budget Tracker!");
  
});

module.exports = app;
