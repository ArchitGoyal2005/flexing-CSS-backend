import { User } from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import { Question } from "../models/questionModel";

const addQuestions= catchAsync(async (req, res) => {
    const user = await User.findById(req.user?.id);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

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
    await user.save();
});
export default addQuestions
