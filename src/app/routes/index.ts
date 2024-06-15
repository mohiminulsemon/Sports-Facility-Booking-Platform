import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { FacilityRoutes } from '../modules/facility/facility.route';


const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: UserRoutes,
      },

      {
        path: "/facility",
        route: FacilityRoutes
      }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
