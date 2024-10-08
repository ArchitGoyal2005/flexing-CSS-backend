import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: [true, "A question must have a questionId"],
    },
    initialCSS: {
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
      enum: ["easy", "medium"],
      require: [true, "A question must have difficulty"],
    },
    points: {
      type: Number,
      require: [true, "A question must have point"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

//NO OF ANSWER LINES TO BE ADDED

QuestionSchema.pre("save", function (next) {
  switch (this.difficulty) {
    case "easy":
      this.points = 100;
      break;
    case "medium":
      this.points = 200;
      break;
    case "difficult":
      this.points = 300;
      break;
  }
  next();
});

export const Question = mongoose.model("Question", QuestionSchema);
