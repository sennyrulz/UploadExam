import { streamUpload } from '../utils/streamUpload.js';


  // === SingleUpoad
  export const singleUpload = async (req, res, next) => {
    try {
      const response = await streamUpload(req.file.buffer, "images", "pdf", "mp4", "mp3");
      return res.json({ message: "Upload successful", response });
    } catch (error) {
      next(error);
    }
  };


// === ARRAY UPLOAD ===
export const uploadArrayFiles = async (req, res, next) => {
  try {
    const uploads = await Promise.all(
      req.files.map((file) => streamUpload(file.buffer, "images", "pdf", "mp4", "mp3"))
    );
    return res.json({ message: "Upload successful", uploads });
  } catch (error) {
    next(error);
  }
};

// === MULTI UPLOAD ===
export const uploadMultiFiles = async (req, res, next) => {
  try {
    const { thumbnailPic, mainPic } = req.files;

    const thumbnailPicUpload = thumbnailPic?.[0]
      ? await streamUpload(thumbnailPic[0].buffer, "images", "pdf", "mp4", "mp3")
      : null;

    const mainPicUpload = mainPic?.[0]
      ? await streamUpload(mainPic[0].buffer, "images", "pdf", "mp4", "mp3")
      : null;

    return res.json({
      message: "Upload successful",
      thumbnailPicUpload,
      mainPicUpload,
    });

  } catch (error) {
    next(error);
  }
};

