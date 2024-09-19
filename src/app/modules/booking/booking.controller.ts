import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const booking = await BookingServices.createBookingIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking created successfully',
    data: booking,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const bookings = await BookingServices.getAllBookings();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: bookings,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const bookings = await BookingServices.getUserBookings(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: bookings,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const bookingId = req.params.id;
  const booking = await BookingServices.cancelBooking(bookingId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking canceled successfully',
    data: booking,
  });
});

const checkAvailability = catchAsync(async (req, res) => {
  const { date } = req.query;
  const availability = await BookingServices.checkAvailability(date as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Availability checked successfully',
    data: availability,
  });
});

export const BookingController = {
  createBooking,
  checkAvailability,
  getAllBookings,
  getUserBookings,
  cancelBooking,
};
