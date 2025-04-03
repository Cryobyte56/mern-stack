import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Deployment Run NPM Build
const __dirname = path.resolve();

app.use(express.json()); //Enable JSON Data into the Body (req.body) (Middleware)

app.use("/api/products", productRoutes);

// Deployment (Also Delete node_modules and dist folders)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log("Server Started at http://localhost:" + port);
});
