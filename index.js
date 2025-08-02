//Mongoose connection
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fileUploadRoute from "./routes/fileUploadRoute.js";

import dotenv from "dotenv";

dotenv.config();
const app = express();

//Middlewares
app.use(urlencoded({ extended: true }));
app.use(express.text({ type: ["application/javascript", "text/plain", "text/html", "application/xml"]}));
app.use(express.json());

// Routes
app.use("/api", fileUploadRoute);


// Mongoose handling middleware
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase" || "https://uploadexam.onrender.com";
mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

  
  // Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});
clearImmediate
    
const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  });

export default app;