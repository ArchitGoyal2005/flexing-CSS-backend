import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: [true, "A question must have a questionId"],
    },
    targetContainerHTML: {
      type: String,
      required: [true, "A question must have targetContainerHTML"],
    },
    objectContainerHTML: {
      type: String,
      required: [true, "A question must have objectContainerHTML"],
    },
    initalCSS: {
      type: String,
      required: [true, "A question must have initalCSS"],
    },
    instructions: {
      type: String,
      required: [true, "A question must have instructions"],
    },
    answer: {
      type: String,
      require: [true, "A question must have answer"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "difficult", "medium"],
      require: [true, "A question must have difficulty"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const Question = mongoose.model("Question", QuestionSchema);
