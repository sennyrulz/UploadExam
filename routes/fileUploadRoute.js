import express from "express";
import { 
  singleUpload as singleUploadMiddleware, 
  arrayUpload as arrayUploadMiddleware, 
  multiUpload as multiUploadMiddleware 
} from "../utils/multer.js";

import {
  createPost as createFileUpload,
  getFileUploads,
  getFileUploadById,
} from "../controllers/postController.js";
// import upload from  "../utils/multer.js";


const route = express.Router();

route.get("/", getFileUploads);
route.get("/:id", getFileUploadById);

route.post("/upload-single", singleUploadMiddleware, createFileUpload);
route.post("/upload-array", arrayUploadMiddleware, createFileUpload);
route.post("/upload-multi", multiUploadMiddleware, createFileUpload);

export default route;
