const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const quizRoutes = require("./routes/quizRoutes");

// Connect Database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/quiz", quizRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
