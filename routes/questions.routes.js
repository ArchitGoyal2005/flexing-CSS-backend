import { Router } from "express";
import { getQuestionsForUser } from "../controllers/questionController";

const router = Router();

router.route("/:userId/").get(getQuestionsForUser);

router.post("/", createQuestion);
