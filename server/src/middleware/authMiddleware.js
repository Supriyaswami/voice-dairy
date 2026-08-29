import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(async (req, _res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader?.startsWith("Bearer ")) {
    throw new AppError("Authentication required.", 401);
  }

  const token = authorizationHeader.split(" ")[1];
  const decoded = jwt.verify(token, env.jwtSecret);
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new AppError("User not found.", 401);
  }

  req.user = user;
  next();
});

