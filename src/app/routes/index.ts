import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { FacilityRoutes } from '../modules/facility/facility.route';
import { BookingRoutes } from "../modules/booking/booking.route";
import { CheckAvailabilityRoutes } from "../modules/booking/availability.route";


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/check-availability',
    route: CheckAvailabilityRoutes
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
