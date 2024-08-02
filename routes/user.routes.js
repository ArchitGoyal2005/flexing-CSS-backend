import { User } from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { Router } from "express";
import { Question } from "../models/questionModel.js";
import { Submission } from "../models/submissionModel.js";

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

//submission
const getSubmission = catchAsync(async (req, res) => {
  const { answer } = req.body;
  const { questionId } = req.body;
  const { userId } = req.params;
  const question = await Question.findById(questionId);

  const isCorrect = answer === question.answer;
  const submission = await Submission.create({
    userId,
    questionId,
    submittedAnswer: answer,
    isCorrect,
  });

  res.status(200).json({
    status: "success",
  });
});

router.route("/:userId/submission").post(getSubmission);
