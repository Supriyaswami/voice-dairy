import { Router } from "express";
import { deleteDiary, getDiary, listDiaries, saveDiary } from "../controllers/diaryController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);
router.post("/save-diary", saveDiary);
router.get("/diaries", listDiaries);
router.get("/diary/:id", getDiary);
router.delete("/diary/:id", deleteDiary);

export default router;

