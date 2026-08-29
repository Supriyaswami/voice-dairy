import path from "path";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { storageService } from "../services/storage/storageService.js";

export const uploadAudio = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Audio file is required.", 400);
  }

  const relativePath = `/uploads/${path.basename(req.file.path)}`;

  res.status(201).json({
    success: true,
    audioPath: relativePath,
    audioUrl: storageService.getAudioUrl(req, relativePath),
    fileName: req.file.originalname
  });
});

