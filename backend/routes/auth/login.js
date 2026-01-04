const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findByEmail } = require("../../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Check user exists
  const user = await findByEmail(email);
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  // 2️⃣ Verify password
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Invalid credentials" });

  // 3️⃣ Generate JWT with ROLE
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  // 4️⃣ Send token + role
  res.json({ token, role: user.role });
});

module.exports = router;
