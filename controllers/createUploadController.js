import fileUploadModel from "../models/fileUploadModel.js";

// === Create Upload ===
export const createUpload = async (req, res) => {
  try {
    const { title, desc, creator } = req.body;

    let thumbnailPicUrl = null;
    let mainPicUrls = [];

    if (req.file) {
      // For single file uploads (e.g., /upload-single)
      thumbnailPicUrl = req.file.path;
    }

    if (req.files) {
      // For multi file uploads (e.g., /upload-multi)
      if (req.files.thumbnailPic) {
        thumbnailPicUrl = req.files.thumbnailPic[0].path;
      }

      if (req.files.mainPic) {
        mainPicUrls = req.files.mainPic.map(file => file.path);
      }
    }

    const newUpload = await fileUploadModel.create({
      title,
      desc,
      creator: creator || undefined,//OPtional
      thumbnailPic: thumbnailPicUrl,
      mainPic: mainPicUrls,
    });

    res.status(201).json({ success: true, upload: newUpload });
    
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
