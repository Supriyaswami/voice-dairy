import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../../utils/appError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsDirectory = path.resolve(__dirname, "../../../uploads");

export const localStorageService = {
  async ensureUploadsDirectory() {
    await fs.mkdir(uploadsDirectory, { recursive: true });
  },

  async deleteAudio(audioPath) {
    if (!audioPath) {
      return;
    }

    const fileName = path.basename(audioPath);
    const absolutePath = path.join(uploadsDirectory, fileName);

    try {
      await fs.unlink(absolutePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw new AppError("Failed to remove audio file.", 500);
      }
    }
  },

  getAudioUrl(req, audioPath) {
    const normalizedPath = audioPath.replace(/\\/g, "/");
    return `${req.protocol}://${req.get("host")}${normalizedPath}`;
  }
};
