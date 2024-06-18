import { Router } from "express";
import { BookingController } from "./booking.controller";
import { adminMiddleware, authenticate, userMiddleware } from "../../middlewares/authenticate";
import validateRequest from "../../middlewares/validateRequest";
import createBookingValidationSchema from "./booking.validation";

const router = Router();

router.post(
    '/',
    authenticate,
    userMiddleware,
    validateRequest(createBookingValidationSchema),
    BookingController.createBooking
  );
  
  router.get('/', authenticate, adminMiddleware, BookingController.getAllBookings);
  router.get('/:user', authenticate, userMiddleware, BookingController.getUserBookings);
  router.delete('/:id', authenticate, userMiddleware, BookingController.cancelBooking);

export const BookingRoutes = router ;