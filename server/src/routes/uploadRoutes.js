import { Router } from "express";
import { uploadAudio } from "../controllers/uploadController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { audioUpload } from "../middleware/uploadMiddleware.js";

const router = Router();

router.post("/upload-audio", authenticate, audioUpload.single("audio"), uploadAudio);

export default router;

