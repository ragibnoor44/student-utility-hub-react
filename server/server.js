const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const notesRoutes = require("./routes/notesRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student Utility Hub API is running!");
});

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
