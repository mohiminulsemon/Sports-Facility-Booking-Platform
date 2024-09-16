import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import config from "../config";
import AppError from "../errors/AppError";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      statusCode: StatusCodes.UNAUTHORIZED,
      message: "You have no access to this route",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    req.user  = decoded as jwt.JwtPayload; 
    next();
  } catch (error) {
    return next(new AppError(StatusCodes.UNAUTHORIZED, "Invalid or expired token"));
  }
};

export default authenticate;
