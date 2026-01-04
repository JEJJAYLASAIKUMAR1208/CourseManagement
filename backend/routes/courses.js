const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// READ ALL (PUBLIC)
router.get("/", (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    res.json(rows);
  });
});

// READ ONE (PUBLIC)
router.get("/:id", (req, res) => {
  db.get(
    "SELECT * FROM courses WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (!row) return res.status(404).json({ message: "Not found" });
      res.json(row);
    }
  );
});

// CREATE (ADMIN ONLY)
router.post("/", auth, admin, (req, res) => {
  const { name, description, instructor } = req.body;

  db.run(
    "INSERT INTO courses (name, description, instructor) VALUES (?, ?, ?)",
    [name, description, instructor],
    function () {
      res.status(201).json({ id: this.lastID });
    }
  );
});

// UPDATE (ADMIN ONLY)
router.put("/:id", auth, admin, (req, res) => {
  const { name, description, instructor } = req.body;

  db.run(
    "UPDATE courses SET name=?, description=?, instructor=? WHERE id=?",
    [name, description, instructor, req.params.id],
    () => res.json({ message: "Updated" })
  );
});

// DELETE (ADMIN ONLY)
router.delete("/:id", auth, admin, (req, res) => {
  db.run(
    "DELETE FROM courses WHERE id=?",
    [req.params.id],
    () => res.json({ message: "Deleted" })
  );
});

module.exports = router;
