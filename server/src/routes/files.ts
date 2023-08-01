import express from "express";
import multer from "multer";
const router = express.Router();
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/File";
const storage = multer.diskStorage({});
let upload = multer({
  storage,
});
router.post("/upload", upload.single("myFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Hey bro! We need the file",
      });
    }

    let uploadFile: UploadApiResponse = {} as UploadApiResponse;
    try {
      uploadFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "ShareItNow",
        resource_type: "auto",
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      res.status(500).json({
        success: false,
        message: "Cloudinary Error :(",
      });
      return;
    }
    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadFile;

    const file = await File.create({
      filename: originalname,
      sizeInBytes: bytes,
      secure_url,
      format,
    });
    return res.status(201).json({
      success: true,
      file,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    res.status(500).json({
      success: false,
      message: "Server Error :(",
    });
  }
});
export default router;
