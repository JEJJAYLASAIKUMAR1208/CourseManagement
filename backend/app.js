const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: [
        "https://courses-3-plsu.onrender.com",
        "http://192.168.0.4:3000"// frontend URL
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth/register", require("./routes/auth/register"));
app.use("/api/auth/login", require("./routes/auth/login"));
app.use("/api/courses", require("./routes/courses"));

module.exports = app;
