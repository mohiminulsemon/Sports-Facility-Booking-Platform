import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginValidationSchema, updateUserValidationSchema, userValidationSchema } from "./user.validation";
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


// Route to get user profile by ID
router.get('/profile/:id', authenticate, UserControllers.getUserById);

// Route to update user data
router.patch(
  "/:id",  // PATCH /api/v1/users/:id
  authenticate,
  validateRequest(updateUserValidationSchema),
  UserControllers.updateUser
);


router.get("/allUsers", UserControllers.getAllUsers);

export const UserRoutes = router;

