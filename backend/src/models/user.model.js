import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    branch: {
      type: String,
      trim: true,
    },
    batch: {
      type: String,
      trim: true,
    },
    graduationYear: {
      type: Number,
      min: 1960,
      max: 2100,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    organization: {
      type: String,
      required: true,
      trim: true,
      immutable: true,
    },
    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ organization: 1 });

const User = mongoose.model("User", userSchema);

export default User;
