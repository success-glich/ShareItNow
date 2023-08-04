import express from "express";
import multer from "multer";
const router = express.Router();
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/File";
import https from "https";
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File does not exist !",
      });
    }
    const { filename, sizeInBytes, format } = file;
    return res.status(200).json({
      success: true,
      file: {
        name: filename,
        sizeInBytes,
        format,
        id,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error :(" });
  }
});
router.get("/:id/download", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File does not exist !",
      });
    }
    https.get(file.secure_url, (fileStream) => fileStream.pipe(res));
  } catch (err) {
    return res.status(500).json({ message: "Server Error :(" });
  }
});
export default router;
