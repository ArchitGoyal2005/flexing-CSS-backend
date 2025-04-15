import { Router } from "express";
import {
  createSubmission,
  getResults,
  getSubmittedQuestionsIdForUser,
} from "../controllers/submission.controllers.js";

const router = Router();

router.get("/results", getResults);

router.get("/:clerkId", getSubmittedQuestionsIdForUser);

router.post("/", createSubmission);

export default router;
