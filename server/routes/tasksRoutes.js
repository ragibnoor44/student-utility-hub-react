const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all tasks for a user
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

// POST a new task
router.post("/", (req, res) => {
  const { user_id, text } = req.body;
  db.query(
    "INSERT INTO tasks (user_id, text) VALUES (?, ?)",
    [user_id, text],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, user_id, text, completed: false });
    },
  );
});

// PUT - toggle complete status
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.query(
    "UPDATE tasks SET completed ? WHERE id = ?",
    [completed, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Task updated" });
    },
  );
});

// DELETE a task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task deleted" });
  });
});

module.exports = router;
