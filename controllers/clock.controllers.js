import { Clock } from "../models/clock.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const startClock = catchAsync(async (req, res, next) => {
  if (!req.body.time) return next(new AppError("Enter time", 400));
  const time = parseInt(req.body.time) * 60 * 1000;
  await Clock.findOneAndUpdate({}, { endTime: Date.now() + time });
  res.status(204).json({
    success: true,
  });
});

export const getClock = catchAsync(async (req, res, next) => {
  const clock = await Clock.find({});
  if (clock.length !== 1)
    return next(
      new AppError("There is problem in clock database restart it.", 404)
    );

  res.status(200).json({
    success: true,
    data: clock[0].endTime,
  });
});
