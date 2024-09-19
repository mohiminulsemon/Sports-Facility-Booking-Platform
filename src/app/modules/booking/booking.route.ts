import { Router } from 'express';
import { BookingController } from './booking.controller';
import { authenticate, userMiddleware, adminMiddleware } from '../../middlewares/authenticate';
import validateRequest from '../../middlewares/validateRequest';
import createBookingValidationSchema from './booking.validation';

const router = Router();

// Booking Routes
router.post(
  '/',
  authenticate,
  userMiddleware,
  validateRequest(createBookingValidationSchema),
  BookingController.createBooking
);
router.get('/', authenticate, adminMiddleware, BookingController.getAllBookings);
router.get('/user', authenticate, userMiddleware, BookingController.getUserBookings);
router.delete('/:id', authenticate, userMiddleware, BookingController.cancelBooking);

export const BookingRoutes = router;

// Check Availability Routes
const checkAvailabilityRouter = Router();
checkAvailabilityRouter.get('/', BookingController.checkAvailability);

export const CheckAvailabilityRoutes = checkAvailabilityRouter;
