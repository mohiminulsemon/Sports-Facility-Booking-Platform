import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";



const createBooking = catchAsync(async (req, res, next) => {

    const userId = req.user._id;
    const booking = await BookingServices.createBookingIntoDB(userId, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Booking created successfully",
        data: booking,
    })
})

const getAllBookings = catchAsync(async (req, res, next) => {

  const bookings = await BookingServices.getAllBookings();

    if (bookings.length > 0) {
        sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "User bookings retrieved successfully",
          data: bookings,
        });
      } else {
        sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          success: false,
          message: "No Data Found",
          data: [],
        });
      }
})

const getUserBookings = catchAsync(async (req, res, next) => {
    const { user : userId } = req.user._id;
    const bookings = await BookingServices.getUserBookings(userId);

    if (bookings.length > 0) {
        sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "User bookings retrieved successfully",
          data: bookings,
        });
      } else {
        sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          success: false,
          message: "No Data Found",
          data: [],
        });
      }
})
const cancelBooking = catchAsync(async (req, res, next) => {

    // const bookingId = req.params.id;
    const { id: bookingId } = req.params;

    const booking = await BookingServices.cancelBooking(bookingId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Cancel Booking successfully",
        data: booking,
    })
})


const checkAvailability = catchAsync(async (req, res, next) => {

  const { date } = req.query;

  const result = await BookingServices.checkAvailability({
    date: date as string,
  });

  sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Availability checked successfully",
      data: result,
  })
})

export const BookingController = {
    createBooking,
    checkAvailability,
    getAllBookings,
    getUserBookings,
    cancelBooking
}