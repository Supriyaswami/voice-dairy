import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { env } from "../../config/env.js";
import { AppError } from "../../utils/appError.js";

export const transcribeAudio = async ({ absoluteFilePath, originalFileName }) => {
  const formData = new FormData();
  formData.append("audio", fs.createReadStream(absoluteFilePath), originalFileName);

  try {
    const response = await axios.post(env.whisperApiUrl, formData, {
      headers: formData.getHeaders(),
      timeout: 1000 * 60 * 5
    });

    const transcript = response.data?.transcript?.trim();
    if (!transcript) {
      throw new AppError("The transcription service returned an empty transcript.", 502);
    }

    return transcript;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Transcription failed. Make sure the Faster Whisper service is running and reachable.",
      502
    );
  }
};

