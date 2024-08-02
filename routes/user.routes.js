import { User } from "../models/userModel.js";
import addQuestions from "../middleware/questions.middleware.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { Router } from "express";
import { Question } from "../models/questionModel.js";
import { Submission } from "../models/submissionModel.js";


const registerUser=catchAsync(async(req,res)=>{
    const {clerkId,rollNumber,name,email,branch,course,year}=req.body
    if (
        [clerkId,rollNumber,name,email,branch,course,year].some((field) => field?.trim() === "")
    ) {
        throw new AppError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [
            { clerkId },
            { email }
        ]
    });

    if (existedUser) {
        throw new AppError(409, "User with email or username already exists")
    }
    const user = await User.create({
        clerkId,
        rollNumber,
        name,
        email,
        branch,
        course,
        year
    })
    user.save()
})
const router=Router()
router.route("/register").post(registerUser)



//submission
const getSubmission = catchAsync(async (req, res) => {
    const{ answer}=req.body
    const {questionId}=req.body
    const {userId}=req.params
    const question= await Question.findById(questionId)
    
    const isCorrect = answer === question.answer;
    const submission = await Submission.create({
        userId,
        questionId,
        submittedAnswer:answer,
        isCorrect
    });

    res.status(200).json({
        status: 'success',
    });

   
});

router.route("/:userId/submission").post(getSubmission)

//questions routes
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
