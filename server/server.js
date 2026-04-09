const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI is not set in the environment");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");

    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("API running");
    });

    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });