import { z } from "zod";

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    password: z.string().min(8),
    imageUrl: z.string().optional(),
    phone: z.string().regex(/^\d{11}$/).optional(),
    role: z.enum(["admin", "user"]).optional(),
    address: z.string().min(1).optional(),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

// User validation schema for updating user information
export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255).optional(), 
    email: z.string().email().optional(), 
    password: z.string().min(8).optional(), 
    imageUrl: z.string().optional(),
    phone: z.string().regex(/^\d{11}$/).optional(), 
    role: z.enum(["admin", "user"]).optional(), 
    address: z.string().min(1).optional(), 
  }),
});