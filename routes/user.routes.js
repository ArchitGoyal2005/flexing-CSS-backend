import { Router } from "express";
import { User } from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const registerUser = catchAsync(async (req, res) => {
  const { clerkId, rollNumber, name, email, branch, course, year } = req.body;
  if (
    [clerkId, rollNumber, name, email, branch, course, year].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new AppError(400, "All fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ clerkId }, { email }],
  });

  if (existedUser) {
    throw new AppError(409, "User with email or username already exists");
  }
  const user = await User.create({
    clerkId,
    rollNumber,
    name,
    email,
    branch,
    course,
    year,
  });
  user.save();
});
const router = Router();
router.route("/register").post(registerUser);
