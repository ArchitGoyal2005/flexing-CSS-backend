import { Router } from "express";
import {Question} from "../models/questionModel.js"
import { User } from "../models/userModel.js"
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";



const router =Router()
const getQuestions = catchAsync(async (req, res) => {
    const user = await User.findById(req.user?.id);
    if (!user) {
        throw new AppError("user not found",404);
    }

    const questions = user.questions;

    if (!questions || questions.length === 0) {
        throw new AppError('No questions found', 400);
    } else {
        const questionsData = await Promise.all(
            questions.map(async questionId => {
                const question = await Question.findOne({ questionId });
                if (!question) {
                    throw new AppError(`Question with ID ${questionId} not found`, 404);
                }
                return question;
            })
        );

        res.status(200).json({
            status: 'success',
            data: {
                questions: questionsData
            }
        });
    }
});

router.route("/:userId/questions").get(getQuestions)
