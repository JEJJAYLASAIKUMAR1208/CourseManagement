const express = require("express");
const bcrypt = require("bcryptjs");
const { findByEmail, createUser } = require("../../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const existing = await findByEmail(email);
  if (existing)
    return res.status(400).json({ message: "Email already exists" });

  const role = email === "admin@test.com" ? "admin" : "student";
  const hashed = await bcrypt.hash(password, 10);

  await createUser(name, email, hashed, role);
  res.status(201).json({ message: "User registered", role });
});

module.exports = router;
