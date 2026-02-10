const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const plaidRoutes = require("./routes/plaidRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://budget-tracker-frontend-vhrh.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.options("*", cors());

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", transactionRoutes);
app.use("/api/plaid", plaidRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Budget Tracker!");
});

module.exports = app;
