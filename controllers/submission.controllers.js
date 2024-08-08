import { Question } from "../models/questionModel.js";
import { Submission } from "../models/submissionModel.js";
import { User } from "../models/userModel.js";
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
    let value1 = obj1[key];
    let value2 = obj2[key];

    if (key === "flex-flow") {
      const vals1 = value1.split(" ");
      const vals2 = value2.split(" ");
      if (vals1.length !== vals2.length) return false;
      return vals1
        .sort()
        .every((value, index) => value === vals2.sort()[index]);
    }

    value1 = value1.replace(/\s+/g, "");
    value2 = value2.replace(/\s+/g, "");

    value1 = value1.replace("flex-", "");
    value2 = value2.replace("flex-", "");

    if (obj1[key] !== obj2[key] && key !== "flex-flow") {
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
    return next(new AppError("Please enter all the valid fields", 400));
  const question = await Question.findById(questionId);

  if (!question)
    return next(new AppError("Please enter a valid question id", 400));

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

export const getSubmittedQuestionsIdForUser = catchAsync(
  async (req, res, next) => {
    if (!req.params.clerkId) return next(new AppError("Enter clerk id"), 400);

    const user = await User.findOne({ clerkId: req.params.clerkId });

    if (!user) return next(new AppError("Enter a valid clerk Id", 404));

    const submissions = await Submission.find(
      {
        isCorrect: true,
        userId: user._id,
      },
      { questionId: 1 }
    );

    const questionIds = submissions.map((submission) => submission.questionId);

    res.status(200).json({
      success: true,
      data: questionIds,
    });
  }
);
