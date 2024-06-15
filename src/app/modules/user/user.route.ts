import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginValidationSchema, userValidationSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema),
  UserControllers.userSignUp,
);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;
