import { z } from "zod";


const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, {
      message: 'Start time must be in HH:MM format',
    }),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, {
      message: 'End time must be in HH:MM format',
    }),
    facility: z.string(),
  }),
});

export default createBookingValidationSchema;