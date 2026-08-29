import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { env } from "../config/env.js";
import { AppError } from "../utils/appError.js";

const signToken = (userId) =>
  jwt.sign({ userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  profilePhoto: user.profilePhoto,
  createdAt: user.createdAt
});

export const registerUser = async ({ name, email, password, profilePhoto }) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new AppError("An account with this email already exists.", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    profilePhoto: profilePhoto || ""
  });

  return {
    token: signToken(user._id),
    user: sanitizeUser(user)
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password.", 401);
  }

  return {
    token: signToken(user._id),
    user: sanitizeUser(user)
  };
};

export const getProfileById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return sanitizeUser(user);
};

