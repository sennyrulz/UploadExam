import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';

export const streamUpload = (buffer, folder = "fileUploads") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
