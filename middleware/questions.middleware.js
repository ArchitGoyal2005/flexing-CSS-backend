import { User } from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import { Question } from "../models/questionModel.js";

const addQuestions=(user)=>{
    const questions = [];
    for (let i = 0; i < 15; i++) {
        if (i < 7) {
            const randomNum = Math.floor(Math.random() * 22); 
            const questionId = `easy_${randomNum}`;
            questions.push(questionId)
        }
        else if(i<13){
            const randomNum = Math.floor(Math.random() * 22) + 15;
            const questionId = `med_${randomNum}`;
            questions.push(questionId)
        }
        else{
            const randomNum = Math.floor(Math.random() * 22) + 22;
            const questionId = `hard_${randomNum}`;
            questions.push(questionId)
        }
    }
    user.questions=questions;
};
export default addQuestions
