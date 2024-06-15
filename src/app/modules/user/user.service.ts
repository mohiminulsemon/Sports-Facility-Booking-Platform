import bcrypt from "bcrypt";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { createToken } from "./user.utils";

const userSignUp = async (payload: TUser) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );
  payload.password = hashedPassword;
  const user = await User.create(payload);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
};

export const UserServices = {
  userSignUp,
  loginUser,
};
