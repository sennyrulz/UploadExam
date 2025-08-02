import express from "express";
import { 
  thumbnailPicUpload as singleUploadMiddleware, 
  arrayUpload as arrayUploadMiddleware, 
  multiUpload as multiUploadMiddleware 
} from "../utils/multer.js";

import {
  createUpload as createFileUpload,
  // getFileUploads,
  // getFileUploadById,
} from "../controllers/createUploadController.js";
// import upload from  "../utils/multer.js";


const route = express.Router();

// route.get("/", getFileUploads);
// route.get("/:id", getFileUploadById);

route.post("/upload-single", singleUploadMiddleware, createFileUpload);
route.post("/upload-array", arrayUploadMiddleware, createFileUpload);
route.post("/upload-multi", multiUploadMiddleware, createFileUpload);

export default route;
