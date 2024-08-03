import { Router } from "express";
import { createSubmission } from "../controllers/submission.controllers.js";

const router = Router();

router.post("/", createSubmission);

export default router;
