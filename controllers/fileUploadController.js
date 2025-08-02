import fileUploadModel from '../models/fileUploadModel.js';
import { streamUpload } from '../utils/streamUpload.js';

// === SINGLE UPLOAD ===
// Example for single file upload
export const uploadSingleFile = async (req, res) => {
  try {
    const { title, desc, creator } = req.body;
    if (!req.file) return res.status(400).json({ message: "File is required" });

    const thumbnailPic = req.file.path;
    const mainPic = thumbnailPic; // or handle differently if you want

    if (!title || !desc || !creator)
      return res.status(400).json({ message: "Title, description and creator are required" });

    const newUpload = new fileUploadModel({
      title,
      desc,
      thumbnailPic,

    });

    await newUpload.save();
    res.status(201).json({ message: "File uploaded successfully", fileUpload: newUpload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// === ARRAY UPLOAD ===
export const uploadArrayFiles = async (req, res) => {
  try {
    const { title, desc, creator } = req.body;
    const results = await Promise.all(
      req.files.map((file) => streamUpload(file.buffer, "images"))
    );

    const newFileUpload = new fileUploadModel({
      title,
      desc,
      creator,
      mainPic: results.map(r => r.secure_url),
    });

    await newFileUpload.save();

    res.status(201).json({
      message: "Array files uploaded successfully",
      fileUpload: newFileUpload,
    });
  } catch (error) {
    console.error("Array upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// === MULTI UPLOAD ===
export const uploadMultiFiles = async (req, res) => {
  try {
    const { title, desc, creator } = req.body;
    const thumbnailPicBuffer = req.files?.thumbnailPic?.[0]?.buffer;
    const mainPicBuffer = req.files?.mainPic?.[0]?.buffer;

    if (!title || !desc || !creator || !thumbnailPicBuffer || !mainPicBuffer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const thumbnailPic = await streamUpload(thumbnailPicBuffer, "images");
    const mainPic = await streamUpload(mainPicBuffer, "images");

    const newFileUpload = new fileUploadModel({
      title,
      desc,
      creator,
      thumbnailPic: thumbnailPic.secure_url,
      mainPic: mainPic.secure_url,
    });

    await newFileUpload.save();

    res.status(201).json({
      message: "Multi files uploaded successfully",
      fileUpload: newFileUpload,
    });
  } catch (error) {
    console.error("Multi upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// === GET SINGLE ===
export const getFileUploadById = async (req, res) => {
  try {
    const { id } = req.params;
    const fileUpload = await fileUploadModel.findById(id).populate('creator', 'username');

    if (!fileUpload) {
      return res.status(404).json({ message: "File upload not found" });
    }

    res.status(200).json(fileUpload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// === GET ALL ===
export const getFileUploads = async (req, res) => {
  try {
    const uploads = await fileUploadModel.find().populate("creator", "username");
    res.status(200).json(uploads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
