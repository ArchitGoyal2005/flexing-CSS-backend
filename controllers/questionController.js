import { Question } from "../models/questionModel";
import { User } from "../models/userModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

export const getQuestionsForUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user?.id);
  if (!user) {
    next(new AppError("user not found", 404));
  }

  const questions = user.questions;

  if (!questions || questions.length === 0) {
    next(new AppError("No questions found", 404));
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
