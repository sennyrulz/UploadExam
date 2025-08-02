import express from "express";
import { 
  singleUpload as singleUploadMiddleware, 
  arrayUpload as arrayUploadMiddleware, 
  multiUpload as multiUploadMiddleware 
} from "../utils/multer.js";

import {
  uploadSingleFile,
  uploadArrayFiles,
  uploadMultiFiles,
  getFileUploads,
  getFileUploadById,
} from "../controllers/fileUploadController.js";

const route = express.Router();

route.get("/", getFileUploads);
route.get("/:id", getFileUploadById);

route.post("/upload-single", singleUploadMiddleware, uploadSingleFile);
route.post("/upload-array", arrayUploadMiddleware, uploadArrayFiles);
route.post("/upload-multi", multiUploadMiddleware, uploadMultiFiles);

export default route;
