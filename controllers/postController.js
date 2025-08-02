import fileUploadModel from '../models/fileUploadModel.js';


// === Create Post ===
export const createPost = async (req, res) => {
  const body = req.body;
  const files = req.files;
  const { id } = req.user;
  
  try {
    if (!files || !files["thumbnailPic"] || !files["mainPic"]) {
      return res.status(400).json({ message: "Images are required" });
    }

        // Upload to Cloudinary using streamifier
    const thumbnailPicResponse = await streamUpload(files["thumbnailPic"][0].buffer, "images");
    const mainPicResponse = await streamUpload(files["mainPic"][0].buffer, "images");

    // Attach/ Append image URLs to body
    body.thumbnailPic = thumbnailPicResponse.secure_url;
    body.mainPic = mainPicResponse.secure_url;

    // Create upload
    const newUpload = new fileUploadModel({
      creator: id,
      ...body,
    });
    const savedUpload = await newUpload.save();

    // Update user with upload reference
    await userModel.findByIdAndUpdate(
      id,
      { $push: { posts: savedUpload._id } },
      { new: true }
    );

    return res.status(201).json({ message: "Upload created successfully!", post: savedPost });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong", error: error.message });
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
