import mongoose from "mongoose"

const fileUploadSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        desc:{
            type:String,
            required: true
        },
        thumbnailPic:{
            type: String,
            required: true
        },
        mainPic:{
            type:[String],
            required:true
        },
        creator:{
            type:mongoose.Types.ObjectId,
            ref: "User",
            // required: true
        },
    },
        { timestamps: true }

);
const fileUpload = mongoose.model("fileUpload", fileUploadSchema);
export default fileUpload;