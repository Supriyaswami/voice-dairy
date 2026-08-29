import { Router } from "express";
import { generateDiary, transcribe } from "../controllers/aiController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/transcribe", authenticate, transcribe);
router.post("/generate-diary", authenticate, generateDiary);

export default router;

