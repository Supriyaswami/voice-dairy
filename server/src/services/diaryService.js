import { Diary } from "../models/Diary.js";
import { AppError } from "../utils/appError.js";
import { getDiaryTitle } from "../utils/dateMeta.js";
import { storageService } from "./storage/storageService.js";

export const createDiary = async ({ userId, audioPath, transcript, diary, day, date, time }) => {
  const entry = await Diary.create({
    userId,
    title: getDiaryTitle({ transcript, date }),
    day,
    date,
    time,
    audioPath,
    transcript,
    diary
  });

  return entry;
};

export const getDiaryById = async (diaryId, userId) => {
  const entry = await Diary.findOne({ _id: diaryId, userId });
  if (!entry) {
    throw new AppError("Diary entry not found.", 404);
  }

  return entry;
};

export const getDiaries = async ({ userId, query }) => {
  const filters = { userId };

  if (query) {
    filters.$or = [
      { date: { $regex: query, $options: "i" } },
      { day: { $regex: query, $options: "i" } },
      { title: { $regex: query, $options: "i" } },
      { transcript: { $regex: query, $options: "i" } },
      { diary: { $regex: query, $options: "i" } }
    ];
  }

  return Diary.find(filters).sort({ createdAt: -1 });
};

export const deleteDiaryById = async ({ diaryId, userId }) => {
  const entry = await Diary.findOneAndDelete({ _id: diaryId, userId });
  if (!entry) {
    throw new AppError("Diary entry not found.", 404);
  }

  await storageService.deleteAudio(entry.audioPath);
  return entry;
};

