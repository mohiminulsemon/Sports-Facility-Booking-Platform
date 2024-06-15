import { z } from "zod";

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().regex(/^\d{11}$/),
    role: z.enum(["admin", "user"]),
    address: z.string().min(1),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
