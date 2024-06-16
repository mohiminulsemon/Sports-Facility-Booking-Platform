import { z } from "zod";

export const createBookingValidationSchema = z.object({
    facility: z.string(),
    date: z.string().refine((val)=> !isNaN(Date.parse(val)), {message: 'Invalid date format'}),
    startTime: z.string(),
    endTime: z.string(),
})

// export const checkAvailabilitySchema = z.object({
//    body: z.object({
//     date: z.string().optional().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' }),
//    })
//   });