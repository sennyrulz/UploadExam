import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; 

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fileUploads",
    allowed_formats: ["jpg", "png", "jpeg", "pdf", "mp4", "mp3"],
  },
});

const singleUpload = multer({ storage }).single("image");
const arrayUpload = multer({ storage }).array("images", 5);
const multiUpload = multer({ storage }).fields([
  { name: "thumbnailPic", maxCount: 1 },
  { name: "mainPic", maxCount: 3 },
]);

export { singleUpload, arrayUpload, multiUpload };
