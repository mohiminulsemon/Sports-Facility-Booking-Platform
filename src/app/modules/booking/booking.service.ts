import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Facility } from "../facility/facility.model";
import { Booking } from "./booking.model";
import { TBooking } from "./booking.interface";
import { Types } from "mongoose";

const createBookingIntoDB = async (userId: string, payload: TBooking) => {
  const { date, startTime, endTime, facility } = payload;

  const isFacilityExists = await Facility.findById(facility);
  if (!isFacilityExists) {
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
  
  const checkAvailability = async (date: Date) => {
    
    const startOfDay = new Date(date);
    startOfDay.setHours(8, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(18, 0, 0, 0);
  

    const bookings = await Booking.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      isBooked: 'confirmed',
    }).select('startTime endTime');
  
    const timeSlots = [];
    const startTime = '08:00';
    const endTime = '20:00';
    const slotDurationInHours = 1;

    let currentTime = new Date(`2000-01-01T${startTime}:00Z`);
    const workingHoursEnd = new Date(`2000-01-01T${endTime}:00Z`);
  
    while (currentTime < workingHoursEnd) {
      const currentSlotEnd = new Date(
        currentTime.getTime() + slotDurationInHours * 60 * 60 * 1000,
      );
      timeSlots.push({
        startTime: formatTime(currentTime),
        endTime: formatTime(currentSlotEnd),
      });
      currentTime = currentSlotEnd;
    }
  
    

    for (const booking of bookings) {
      const index = timeSlots.findIndex(
        (slot) =>
          slot.startTime === booking.startTime &&
          slot.endTime === booking.endTime,
      );
      if (index !== -1) {
        timeSlots.splice(index, 1); // Remove booked slot
      }
    }
    return timeSlots;
  };

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };


  const getAllBookings = async () => {
    const result = await Booking.find().populate('facility').populate('user');
    return result;
  };
  
 const getUserBookings = async (userId: string) => {
    const bookings = await Booking.find({ user: userId }).populate('facility');
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