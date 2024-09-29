import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (
  jwtPayload: {
    _id: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    imageUrl: string;
    role: string;
    address: string;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
