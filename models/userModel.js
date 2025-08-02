import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: [ "Male", "Female"]
    },
    married: {
        type: Boolean,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
     hobbies: {
        type: [String],
    },
    kyc: { 
        type: mongoose.Types.ObjectId, 
        ref: "Kyc" 
    },
    posts: [{ type:mongoose.Types.ObjectId, ref:"Post" }],
    books: [{ type: mongoose.Types.ObjectId, ref: "Book" }],

    admin: { 
        type: Boolean, 
        default: false 
    },
},
    { timestamps: true }
);

//mongoode middleware optional
userSchema.pre("save", async function(next) {
    const hashedPassword = bcrypt.hashSync(this.password, 10)
    this.password = hashedPassword;
    next();
});
userSchema.pre("validate", function(next) {
    console.log("something happened 2");
    next();
});

userSchema.post("save", function (doc, next) {
    console.log(doc);
    console.log("sent an email to the user");
    next();
});

// userSchema.pre("insertMany", function(next) {
//     console.log("insertMany");
//     next();
// });

//create model
const userModel = mongoose.model("User", userSchema);
//middle
export default userModel;
