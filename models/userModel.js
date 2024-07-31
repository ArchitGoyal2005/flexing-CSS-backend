import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: [true, "User ID is required"],
      unique: true,
    },
    rollNumber: {
      type: String,
      required: [true, "Roll Number is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
    },
    branch: {
      type: String,
      required: [true, "Branch is required"],
    },
    course: {
      type: String,
      required: [true, "course is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: 2,
    },
    hasPlayed: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: 0,
    },
    questions: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const User = mongoose.model("User", UserSchema);
