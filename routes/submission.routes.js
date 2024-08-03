import { Router } from "express";
import {
  createSubmission,
  getSubmittedQuestionsIdForUser,
} from "../controllers/submission.controllers.js";

const router = Router();

router.get("/:clerkId", getSubmittedQuestionsIdForUser);

router.post("/", createSubmission);

export default router;
