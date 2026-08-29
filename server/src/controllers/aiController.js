import path from "path";
import { fileURLToPath } from "url";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { transcribeAudio } from "../services/ai/transcriptionService.js";
import { generateDiaryFromTranscript } from "../services/ai/ollamaService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const transcribe = asyncHandler(async (req, res) => {
  const { audioPath } = req.body;
  if (!audioPath) {
    throw new AppError("Audio path is required.", 400);
  }

  const fileName = path.basename(audioPath);
  const absoluteFilePath = path.resolve(__dirname, "../../uploads", fileName);
  const transcript = await transcribeAudio({
    absoluteFilePath,
    originalFileName: fileName
  });

  res.status(200).json({
    success: true,
    transcript
  });
});

export const generateDiary = asyncHandler(async (req, res) => {
  const { transcript } = req.body;
  if (!transcript?.trim()) {
    throw new AppError("Transcript is required.", 400);
  }

  const diary = await generateDiaryFromTranscript(transcript.trim());
  res.status(200).json({
    success: true,
    diary
  });
});

