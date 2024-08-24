import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Facility } from "../facility/facility.model";
import { Booking } from "./booking.model";
import { TBooking } from "./booking.interface";
import { Types } from "mongoose";

const createBookingIntoDB = async (userId: string, payload: TBooking) => {
  const { date, startTime, endTime, facility } = payload;

  const isFacilityExists = await Facility.findById(facility);
  if (!isFacilityExists || isFacilityExists.isDeleted) {
    throw new AppError( StatusCodes.NOT_FOUND, "Facility not found");
  }
  const pricePerHour = isFacilityExists.pricePerHour;
  const startDate = new Date(date + 'T' + startTime);
  const endDate = new Date(date + 'T' + endTime);
  const durationInHours =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const payableAmount = durationInHours * pricePerHour;


  const conflictingBooking = await Booking.findOne({
    facility: new Types.ObjectId(facility),
    date,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });

  if (conflictingBooking) {
    throw new Error("The facility is unavailable during the requested time slot.");
  }

  const result = await Booking.create({
    facility,
    date,
    startTime,
    endTime,
    user: userId,
    payableAmount,
  });

  return result;
  };
  
export const checkAvailability = async (payload: {
  date?: string;
}) => {
  const { date } = payload;
  const bookingDate = date || new Date().toISOString().split('T')[0];

  const availabilityBooking = await Booking.find(
    { date: bookingDate },
    { startTime: 1, endTime: 1, _id: 0 },
  );

  return availabilityBooking;
};


  const getAllBookings = async () => {
    const result = await Booking.find().populate('facility').populate('user');
    return result;
  };
  
 const getUserBookings = async (userId: string) => {
    const bookings = await Booking.find({ user: userId }).populate('facility');
    if (!bookings) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to Find Bookings ');
    }
    return bookings; 
  };
  
 const cancelBooking = async (bookingId: string) => {
    const booking = await Booking.findByIdAndUpdate(bookingId, { isBooked: 'canceled' }, { new: true }).populate('facility');
    if (!booking) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Booking data not found');
    }
    return booking;
  };


  export const BookingServices = {
    createBookingIntoDB,
    checkAvailability,
    getAllBookings,
    getUserBookings,
    cancelBooking
  }