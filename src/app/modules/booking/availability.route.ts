import express from 'express';
import { BookingController } from './booking.controller';


const router = express.Router();
router.get('/', BookingController.checkAvailability);

export const CheckAvailabilityRoutes = router;