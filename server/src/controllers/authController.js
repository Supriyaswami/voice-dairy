import { User } from "../models/User.js";
import { Diary } from "../models/Diary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { getProfileById, loginUser, registerUser } from "../services/authService.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, profilePhoto } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required.", 400);
  }

  const result = await registerUser({ name, email, password, profilePhoto });
  res.status(201).json({ success: true, ...result });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required.", 400);
  }

  const result = await loginUser({ email, password });
  res.status(200).json({ success: true, ...result });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await getProfileById(req.user._id);
  const totalDiaries = await Diary.countDocuments({ userId: req.user._id });

  res.status(200).json({
    success: true,
    user: {
      ...user,
      totalDiaries
    }
  });
});

export const seedDemoUserGuard = asyncHandler(async (_req, _res, next) => {
  const adminExists = await User.exists({});
  if (!adminExists) {
    next();
    return;
  }

  next();
});

