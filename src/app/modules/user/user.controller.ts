import { Request, Response, NextFunction } from "express";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userSignUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.userSignUp(req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "User registered successfully",
      data: user,
    });
  },
);

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new AppError(
          StatusCodes.BAD_REQUEST,
          "Email and password are required",
        ),
      );
    }

    const user = await UserServices.loginUser(email, password);

    res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "User logged in successfully",
      token: user.token,
      data: user.user,
    });
  },
);

// Controller to get user data by ID
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserServices.getUserById(id);

  res.status(StatusCodes.OK).json({
    success: true,
    statusCode: StatusCodes.OK,
    message: "User retrieved successfully",
    data: user,
  });
});

// Controller function to get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserServices.getAllUsers();

  res.status(StatusCodes.OK).json({
    success: true,
    statusCode: StatusCodes.OK,
    message: "All users retrieved successfully",
    data: users,
  });
});

// Controller function to update user data
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser = await UserServices.updateUser(id, req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    statusCode: StatusCodes.OK,
    message: "User updated successfully",
    data: updatedUser,
  });
});

export const UserControllers = {
  userSignUp,
  loginUser,
  getAllUsers,
  updateUser,
  getUserById,  
};
