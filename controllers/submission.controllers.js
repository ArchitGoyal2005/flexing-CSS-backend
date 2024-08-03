import { Question } from "../models/questionModel.js";
import { Submission } from "../models/submissionModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

const isEqualCSS = (css1, css2) => {
  const obj1 = JSON.parse(css1);
  const obj2 = JSON.parse(css2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  console.log(obj1, obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

export const createSubmission = catchAsync(async (req, res, next) => {
  const { answer } = req.body;
  const { questionId } = req.body;
  const { userId } = req.body;
  if (!answer || !questionId || !userId)
    next(new AppError("Please enter all the valid fields", 400));
  const question = await Question.findById(questionId);

  if (!question) next(new AppError("Please enter a valid question id", 400));

  const isCorrect = isEqualCSS(answer, question.answer);
  const submission = await Submission.create({
    userId,
    questionId,
    submittedAnswer: answer,
    isCorrect,
    pointsScored: isCorrect ? question.points : -20,
  });

  res.status(201).json({
    status: "success",
    isCorrect,
  });
});
