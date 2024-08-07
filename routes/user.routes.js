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

const endTestForUser = catchAsync(async (req, res, next) => {
  if (!req.body.id || !req.body.timeLeft)
    return next(new AppError("Please fill all the details!!", 404));

  const user = await User.findByIdAndUpdate(
    req.body.id,
    {
      hasPlayed: true,
      timeLeft: req.body.timeLeft,
    },
    { new: true }
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: "true",
    data: user,
  });
});

const router = Router();

router.route("/register").post(registerUser);
router.route("/end").patch(endTestForUser);

export default router;
