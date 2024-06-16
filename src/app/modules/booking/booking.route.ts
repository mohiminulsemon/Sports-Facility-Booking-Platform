import { Router } from "express";
import { BookingController } from "./booking.controller";
import { adminMiddleware, authenticate, userMiddleware } from "../../middlewares/authenticate";

const router = Router();

router.get('/check-availability', BookingController.checkAvailability);
router.post('/', authenticate,userMiddleware, BookingController.createBooking);
router.get('/', authenticate,adminMiddleware, BookingController.getAllBookings);
router.get('/user', authenticate,userMiddleware, BookingController.getUserBookings);
router.delete('/:id',authenticate,userMiddleware, BookingController.cancelBooking);

export const BookingRoutes = router ;