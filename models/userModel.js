import mongoose from "mongoose";
import addQuestions from "../middleware/questions.middleware.js";

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: [true, "User ID is required"],
      unique: true,
    },
    clerk_username: {
      type: String,
      required: [true, "User Name is required"],
      unique: true,
    },
    rollNumber: {
      type: String,
      required: [true, "Roll Number is required"],
      uniques: true,
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
      required: [true, "Course is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: 1,
      max: 2,
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

UserSchema.pre("save", function (next) {
  if (this.questions.length === 0) {
    addQuestions(this);
  }
  next();
});

export const User = mongoose.model("User", UserSchema);
