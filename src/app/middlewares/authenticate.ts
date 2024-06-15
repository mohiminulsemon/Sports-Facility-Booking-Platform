import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import config from "../config";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(401, "You have no access to this route"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    req.user = decoded as jwt.JwtPayload;
    // console.log("User authenticated: ", req.user);
    next();
  } catch (error) {
    return next(new AppError(401, "Invalid token"));
  }
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.role !== "admin") {
    return next(new AppError(403, "You have no access to this route"));
  }
  next();
};

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.role !== "user") {
    return next(new AppError(403, "You have no access to this route"));
  }
  next();
};
