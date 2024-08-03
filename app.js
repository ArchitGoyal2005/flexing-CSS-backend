import express from "express";
import cors from "cors";
import AppError from "./utils/AppError.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
const ContestSchema ={
  start:Date,
  end:Date
};
const Contest= mongoose.model("Contest",ContestSchema);
if(Contest.findOne({})==null){
  const c=new Contest({
    start:null,
    end:null
  });
  c.save();
}
const QuestionSchema = {
  questionId : String,
  targetContainerHTML : String,
  objectContainerHTML : String,
  initalCSS : String,
  instructions : String, 
  answer : String,
  difficulty : String,
  };
const Question=mongoose.model("Question",QuestionSchema);
const SubmissionSchema = new mongoose.Schema({
  userid:String,
  questionid:String,
  submittedanswer:String,
  verdict:Boolean,
});
const UserSchema=new mongoose.Schema({
  userid:String,
  roll:{type:String,required:true},
  name:String,
  email:String,
  dob:Date,
  branch:String,
  batch:Number,
  hasPlayed:Boolean,
  score:Number,
  questions:Array,
  hasFinished:Boolean
});
const User=mongoose.model("User",UserSchema);
const Submission=mongoose.model("Submission",SubmissionSchema);
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
app.get("/contest/start/new",(req,res)=>{
  let s=new Date();
  let e=new Date(s.getTime()+(1*60*60*1000));
  Contest.updateOne({},{$set:{start:s,end:e}}).then(()=>{res.send("Contest Started");}).catch((err)=>{res.send(err);});
});
app.post("/getquestions",(req,res)=>{
    let currtim=new Date();
    const contestTimings=Contest.findOne({});
    if(contestTimings.start===null||(currtim>=contestTimings.start && currtim<=contestTimings.end)){
    const u=User.findOne({userid:req.userid});
    if(u.questions.length===15){
        res.json(u.questions);
    }
    else{
      var q=[];
      var eachdiffq=setquestions(7,"easy");
      q.concat(eachdiffq);
      eachdiffq=setquestions(5,"medium");
      q.concat(eachdiffq);
      eachdiffq=setquestions(3,"hard");
      q.concat(eachdiffq);
      User.updateOne({userid:req.userid},{$set:{questions:q,hasPlayed:true}});
      res.json(q);
    }}
    else{
      res.json("Contest not Started!");
    }
});
app.post("/signup",(req,res)=>{
  const newuser= new User({
    userid:req.user.userid,
    roll:req.user.roll,
    name:req.user.name,
    email:req.user.email,
    dob:req.user.dob,
    branch:req.user.branch,
    batch:req.user.batch,
    hasPlayed:false,
    hasFinished:false,
    score:0,
    questions:[],
  });
newuser.save().then(()=>{res.send("success");}).catch((err)=>{res.send(err);});
});
app.post("/submit",(req,res)=>{
  let currtim=new Date();
  const u=User.findOne({userid:req.submission.userid});
  const contestTimings=Contest.findOne({});
  if(contestTimings.end===null || currtim<=contestTimings.end || u.hasFinished===true){
    var v=false;
    const q=Question.findOne({questionId:req.submission.questionId});
    if(req.submission.answer===q.answer){
      v=true;
    }
    var newscore=u.score-25;
    if(v){newscore+=125;}
    const newSubmission=Submission({userid:u.userid,questionId:q.questionId,submittedanswer:req.submission.answer,verdict:v});
    User.updateOne({userid:u.userid},{$set:{score:newscore}});
    res.json(String(v));}
    else{
      res.json("Contest ended!");
    }
});
app.post("/finish",(req,res)=>{
    User.updateOne({userid:req.userid},{$set:{hasFinished:true}});
    res.json("Finished!");
});
app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;


function setquestions(l,diff){
  var ques=Question.find({difficulty:diff});
    var check=new Array(l);
    for(var i=0;i<(3*l);i++){
      check[i]=false;
    }
    var q=[];
    while(q.length<l){
      var i=Math.random()%(3*l);
      if(check[i]===false){
        check[i]=true;
        q.push(ques[i]);
      }
    }
    return q;
}