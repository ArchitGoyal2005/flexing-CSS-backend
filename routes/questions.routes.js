import { Router } from "express";
import {
  createQuestion,
  getQuestionsForUser,
} from "../controllers/questions.controller.js";

const router = Router();

router.route("/:userId/").get(getQuestionsForUser);

router.post("/", createQuestion);

export default router;
