const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const gamesRoutes = require("./routes/games")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/games",gamesRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});