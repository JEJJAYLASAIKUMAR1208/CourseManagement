const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: [
        "https://coursemanagement-0fcn.onrender.com"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth/register", require("./routes/auth/register"));
app.use("/api/auth/login", require("./routes/auth/login"));
app.use("/api/courses", require("./routes/courses"));

module.exports = app;

