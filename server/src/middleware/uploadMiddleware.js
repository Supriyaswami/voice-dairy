import multer from "multer";
import path from "path";
import { env } from "../config/env.js";
import { AppError } from "../utils/appError.js";
import { uploadsDirectory } from "../services/storage/localStorageService.js";

const allowedMimeTypes = [
  "audio/webm",
  "audio/wav",
  "audio/mp4",
  "audio/mpeg",
  "audio/ogg"
];

const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname) || ".webm";
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    callback(null, fileName);
  }
});

export const audioUpload = multer({
  storage,
  limits: {
    fileSize: env.maxAudioSizeMb * 1024 * 1024
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      callback(new AppError("Unsupported audio format.", 400));
      return;
    }

    callback(null, true);
  }
});
