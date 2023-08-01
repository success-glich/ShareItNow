import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db";
import fileRoutes from "./src/routes/files";
import { v2 as cloudinary } from "cloudinary";

const app = express();
dotenv.config({});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

connectDB();

app.use(cors({}));
app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1/files", fileRoutes);
const PORT = process.env.PORT || 8008;
console.log(PORT);
app.listen(8008, () => console.log(`Server is listening on PORT ${PORT}`));
