import { Router } from "express";
import { getClock, startClock } from "../controllers/clock.controllers.js";

const router = Router();

router.get("/getClock", getClock);
router.patch("/startClock", startClock);

export default router;
