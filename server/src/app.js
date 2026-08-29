import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import diaryRoutes from "./routes/diaryRoutes.js";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "ECHO DIARY API is running."
  });
});

app.use("/api", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", aiRoutes);
app.use("/api", diaryRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

