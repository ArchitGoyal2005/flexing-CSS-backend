import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "A submission must be done by a user"],
    },
    questionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
      require: [true, "A submission must has a questionId"],
    },
    submittedAnswer: {
      type: String,
      required: [true, "A ansewer must have been submitted"],
    },
    isCorrect: Boolean,
    answerSubmitted:{
      type:Boolean,
      default:false,
      required:true
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

export const Submission = mongoose.model("Submission", SubmissionSchema);
