import { z } from "zod";

export const createBookingValidationSchema = z.object({
    facility: z.string(),
    date: z.string().refine((val)=> !isNaN(Date.parse(val)), {message: 'Invalid date format'}),
    startTime: z.string(),
    endTime: z.string(),
})
