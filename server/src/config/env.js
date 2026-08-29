import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const requiredKeys = ["MONGODB_URI", "JWT_SECRET"];

for (const key of requiredKeys) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT || 5000),
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  ollamaApiUrl: process.env.OLLAMA_API_URL || "http://127.0.0.1:11434/api/generate",
  ollamaModel: process.env.OLLAMA_MODEL || "llama3.1",
  whisperApiUrl: process.env.WHISPER_API_URL || "http://127.0.0.1:8000/transcribe",
  maxAudioSizeMb: Number(process.env.MAX_AUDIO_SIZE_MB || 50)
};

