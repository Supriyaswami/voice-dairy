import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    day: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true,
      index: true
    },
    time: {
      type: String,
      required: true
    },
    audioPath: {
      type: String,
      required: true
    },
    transcript: {
      type: String,
      required: true
    },
    diary: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

diarySchema.index({ title: "text", transcript: "text", diary: "text", date: "text", day: "text" });

export const Diary = mongoose.model("Diary", diarySchema);

