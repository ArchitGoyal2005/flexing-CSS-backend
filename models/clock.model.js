import mongoose, { Schema } from "mongoose";

const clockSchema = new Schema(
  {
    endTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export const Clock = mongoose.model("Clock", clockSchema);
