const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all notes for a user
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  db.query(
    "SELECT * FROM notes WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    },
  );
});

// POST a new note
router.post("/", (req, res) => {
  const { user_id, title, text } = req.body;
  db.query(
    "INSERT INTO notes (user_id, title, text) VALUES (?, ?, ?)",
    [user_id, title, text],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, user_id, title, text });
    },
  );
});

// DELETE a note
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  db.query(
    "DELETE FROM notes WHERE id = ? AND user_id = ?",
    [id, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(403).json({ error: "Not authorized" });
      res.json({ message: "Note deleted" });
    },
  );
});

module.exports = router;
