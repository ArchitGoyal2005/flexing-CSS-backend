import { Router } from "express";
import { User } from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const registerUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: "true",
    data: user,
  });
});

const router = Router();

router.route("/register").post(registerUser);

export default router;
