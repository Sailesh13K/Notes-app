const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/auth.js");
const noteRoutes = require("./routes/note.js");
const connectToMongoDB = require("./db/db.js");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

// start server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;
