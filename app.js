import express from "express";
import cors from "cors";
import AppError from "./utils/AppError.js";

import questionRouter from "./routes/questions.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/api/v1/questions", questionRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;
