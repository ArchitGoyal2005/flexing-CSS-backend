import express from "express";
import cors from "cors";
import AppError from "./utils/AppError.js";

import questionRouter from "./routes/questions.routes.js";
import submissionRouter from "./routes/submission.routes.js";
import clockRouter from "./routes/clock.routes.js";
import userRouter from "./routes/user.routes.js";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

app.use(morgan("tiny"));

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/submissions", submissionRouter);
app.use("/api/v1/clock", clockRouter);
app.use("/api/v1/users", userRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;
