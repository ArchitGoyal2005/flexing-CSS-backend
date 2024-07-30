import express from "express";
import cors from "cors";
import AppError from "./utils/AppError.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
const QuestionSchema = new mongoose.Schema({
  qid:String,
  ques:String,
  ans:String,
});
const Question=mongoose.model("Question",QuestionSchema);
const SubmissionSchema = new mongoose.Schema({
  userid:String,
  questions:Array,
  submissions:Array,
});
const UserSchema=new mongoose.Schema({
  userid:String,
  name:String,
  email:String,
});
const User=mongoose.model("User",UserSchema);
const Submission=mongoose.model("Submission",SubmissionSchema);
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
app.post("/getquestions",(req,res)=>{
  const prevsub=Submission.findOne({userid:req.userid});
  if(prevsub){
    res.json({questions:prevsub.questions,submissions:prevsub.submissions});
  }
  else{
    var ques=Question.find({});
    var check=new Array(40);
    for(var i=0;i<40;i++){
      check[i]=false;
    }
    var q=[];
    while(q.length<10){
      var i=Math.random()%40;
      if(check[i]===false){
        check[i]=true;
        q.push(ques[i]);
      }
    }
    const newusersub=new Submission({
      questions:q,
      submissions:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      userid:req.userid
    });
    newusersub.save();
    res.send({questions:q,submissions:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]});
  }
});
app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;
