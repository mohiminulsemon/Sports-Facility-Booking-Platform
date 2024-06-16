import { Types } from "mongoose";

export type TBooking = {
  date: Date;
  startTime: String;
  endTime: String;
  user: Types.ObjectId; 
  facility: Types.ObjectId; 
  payableAmount: number;
  isBooked: 'confirmed' | 'canceled';
}