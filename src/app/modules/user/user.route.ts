import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginValidationSchema, userValidationSchema } from "./user.validation";
import authenticate from "../../middlewares/auth.middleware";
import { StatusCodes } from "http-status-codes";

const router = express.Router();



router.post(
  "/signup",
  validateRequest(userValidationSchema),
  UserControllers.userSignUp
);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  UserControllers.loginUser
);

router.post("/logout", authenticate, (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    statusCode: StatusCodes.OK,
    message: "User logged out successfully",
  });
});


router.get("/profile", authenticate, (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    statusCode: StatusCodes.OK,
    data: req.user, 
  });
});

export const UserRoutes = router;

