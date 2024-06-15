import { Router } from 'express';
import  express  from 'express';
import { adminMiddleware, authenticate } from '../../middlewares/authenticate';
import validateRequest from '../../middlewares/validateRequest';
import { createFacilityValidationSchema, updateFacilityValidationSchema } from './facility.validation';
import { FacilityController } from './facility.controller';

const router = express.Router();

router.post(
    "/",
     authenticate,
     adminMiddleware,
     validateRequest(createFacilityValidationSchema),
     FacilityController.createFacility
)


router.get(
    "/",
    FacilityController.getAllFacilities);
    
    router.put(
        "/:id",
        authenticate,
        adminMiddleware,
        validateRequest(updateFacilityValidationSchema),
        FacilityController.updateFacility,
      );
      
      router.delete(
        "/:id",
        authenticate,
        adminMiddleware,
        FacilityController.deleteFacility,
      );


export const FacilityRoutes = router;