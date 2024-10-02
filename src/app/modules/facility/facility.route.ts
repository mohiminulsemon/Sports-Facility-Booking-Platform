import express from 'express';
import { authenticate, adminMiddleware } from '../../middlewares/authenticate';
import validateRequest from '../../middlewares/validateRequest';
import { createFacilityValidationSchema, updateFacilityValidationSchema } from './facility.validation';
import { FacilityController } from './facility.controller';

const router = express.Router();

// Admin only - Create Facility
router.post(
  "/",
  authenticate,
  adminMiddleware,
  validateRequest(createFacilityValidationSchema),
  FacilityController.createFacility
);

// Get All Facilities with Pagination
router.get(
  "/",
  FacilityController.getAllFacilities
);

// Get Single Facility 
router.get(
  "/:id",
  FacilityController.getSingleFacility
)

// Admin only - Update Facility
router.put(
  "/:id",
  authenticate,
  adminMiddleware,
  validateRequest(updateFacilityValidationSchema),
  FacilityController.updateFacility
);

// Admin only - Soft Delete Facility
router.delete(
  "/:id",
  authenticate,
  adminMiddleware,
  FacilityController.deleteFacility
);

export const FacilityRoutes = router;
