import { Types } from "mongoose";

export type TBooking = {
  date: Date;
  startTime: Date;
  endTime: Date;
  user: string; // Reference to user ID
  facility: string; // Reference to facility ID
  payableAmount: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
}