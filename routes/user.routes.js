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
  if (
    !req.body.id ||
    req.body.timeLeft === undefined ||
    req.body.timeLeft === null
  )
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

const addQuestions = catchAsync(async (req, res, next) => {
  const users = await User.find(); // Get all users
  await Promise.all(
    users.map(async (user) => {
      const questions = [];
      const usedQuestionsEasy = new Set();
      const usedQuestionsMedium = new Set();

      for (let i = 0; i < 15; i++) {
        let questionId;
        let randomNum;

        if (i < 3 || i === 13 || i === 14) {
          do {
            randomNum = Math.floor(Math.random() * 17) + 1;
            questionId = `easy_${randomNum}`;
          } while (usedQuestionsEasy.has(questionId));
          usedQuestionsEasy.add(questionId);
        } else {
          do {
            randomNum = Math.floor(Math.random() * 12) + 1;
            questionId = `medium_${randomNum}`;
          } while (usedQuestionsMedium.has(questionId));
          usedQuestionsMedium.add(questionId);
        }
        questions.push(questionId);
      }

      user.questions = questions;
      await user.save();
    })
  );

  res.status(200).json({
    success: "true",
  });
});

const router = Router();

router.route("/register").post(registerUser);
router.route("/end").patch(endTestForUser);
router.route("/correctQs").patch(addQuestions);

export default router;
