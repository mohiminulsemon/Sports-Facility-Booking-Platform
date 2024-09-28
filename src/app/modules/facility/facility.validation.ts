import { z } from "zod";

export const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    pricePerHour: z.number().min(0, "Price per hour must be a positive number"),
    location: z.string().min(1, "Location is required"),
    isDeleted: z.boolean().optional(),
  }),
});

export const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    imageUrl: z.string().optional(),
    pricePerHour: z.number().min(0, "Price per hour must be a positive number").optional(),
    location: z.string().min(1).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
