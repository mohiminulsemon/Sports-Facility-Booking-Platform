import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Facility } from "../facility/facility.model";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (userId: string,payload: any) => {
    const {facility, date, startTime, endTime } = payload;
    const facilityInfo = await Facility.findById(facility);

    if(!facilityInfo) {
        throw new Error("Facility not found");
    }


    const start = new Date(startTime as string);
    const end = new Date(endTime as string);

    const durationHours = (end.getTime() - start.getTime()) / 1000 / 60 / 60;
    const payableAmount = durationHours * facilityInfo.pricePerHour;

    const booking = await Booking.create({
        ...payload,
        user: userId,
        payableAmount,
        isBooked: 'confirmed'
    });

    return booking;

}

const checkAvailability = async (date?: string) => {
    
    const bookingDate = date ? new Date(date) : new Date();
    bookingDate.setHours(0, 0, 0, 0); 
    
    const nextDay = new Date(bookingDate);
    nextDay.setDate(bookingDate.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0); 
  
    
    const workingHoursStart = new Date(bookingDate);
    workingHoursStart.setHours(8, 0, 0, 0);
    
    const workingHoursEnd = new Date(bookingDate);
    workingHoursEnd.setHours(20, 0, 0, 0);
  
    
    const bookings = await Booking.find({
      date: {
        $gte: bookingDate,
        $lt: nextDay,
      },
    });
  
    const timeSlots = [];
    const currentTime = new Date(workingHoursStart);
  
    while (currentTime < workingHoursEnd) {
      const endTime = new Date(currentTime);
      endTime.setHours(currentTime.getHours() + 1);
  
      const isAvailable = !bookings.some(booking => {
        const bookingStartTime = new Date(booking.startTime);
        const bookingEndTime = new Date(booking.endTime);
        
        return (bookingStartTime <= currentTime && bookingEndTime > currentTime) ||
               (bookingStartTime < endTime && bookingEndTime >= endTime);
      });
  
      if (isAvailable) {
        timeSlots.push({
          startTime: currentTime.toTimeString().slice(0, 5),
          endTime: endTime.toTimeString().slice(0, 5)
        });
      }
  
      currentTime.setHours(currentTime.getHours() + 1);
    }
  
    return timeSlots;
  };

  const getAllBookings = async () => {
    const bookings = await Booking.find().populate('user facility');
    return bookings;
  };
  
 const getUserBookings = async (userId: string) => {
    const bookings = await Booking.find({ user: userId }).populate('facility');
    return bookings;
  };
  
 const cancelBooking = async (bookingId: string) => {
    const booking = await Booking.findByIdAndUpdate(bookingId, { isBooked: 'canceled' }, { new: true });
    if (!booking) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found');
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