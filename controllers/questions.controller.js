import { Question } from "../models/questionModel.js";
import { User } from "../models/userModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getQuestionsForUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ clerkId: req.params.userId });

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  const questions = user.questions;

  if (questions.length === 0) {
    return next(new AppError("No questions found", 404));
  } else {
    const questionsData = await Question.find({
      questionId: { $in: questions },
    });

    res.status(200).json({
      status: "success",
      data: {
        questions: questionsData,
      },
    });
  }
});

export const createQuestion = catchAsync(async (req, res, next) => {
  const newQuestion = await Question.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: newQuestion,
    },
  });
});
