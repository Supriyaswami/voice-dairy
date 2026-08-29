import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { createDiary, deleteDiaryById, getDiaries, getDiaryById } from "../services/diaryService.js";
import { storageService } from "../services/storage/storageService.js";

export const saveDiary = asyncHandler(async (req, res) => {
  const { audioPath, transcript, diary, day, date, time } = req.body;

  if (!audioPath || !transcript?.trim() || !diary?.trim() || !day || !date || !time) {
    throw new AppError("Audio, transcript, diary, day, date, and time are required.", 400);
  }

  const entry = await createDiary({
    userId: req.user._id,
    audioPath,
    transcript: transcript.trim(),
    diary: diary.trim(),
    day,
    date,
    time
  });

  res.status(201).json({
    success: true,
    diary: {
      ...entry.toObject(),
      audioUrl: storageService.getAudioUrl(req, entry.audioPath)
    }
  });
});

export const listDiaries = asyncHandler(async (req, res) => {
  const entries = await getDiaries({
    userId: req.user._id,
    query: req.query.q?.trim()
  });

  res.status(200).json({
    success: true,
    diaries: entries.map((entry) => ({
      ...entry.toObject(),
      audioUrl: storageService.getAudioUrl(req, entry.audioPath)
    }))
  });
});

export const getDiary = asyncHandler(async (req, res) => {
  const entry = await getDiaryById(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    diary: {
      ...entry.toObject(),
      audioUrl: storageService.getAudioUrl(req, entry.audioPath)
    }
  });
});

export const deleteDiary = asyncHandler(async (req, res) => {
  await deleteDiaryById({ diaryId: req.params.id, userId: req.user._id });

  res.status(200).json({
    success: true,
    message: "Diary deleted successfully."
  });
});

